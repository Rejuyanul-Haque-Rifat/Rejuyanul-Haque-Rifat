import { useState, useEffect } from 'react';
import { localDB } from '../lib/db';
import { optimizeCloudinaryUrl } from '../utils/upload';

const failedUrls = new Set<string>();
const blobUrlMap = new Map<string, string>();
const inFlightRequests = new Set<string>();
const cacheQueue: Array<() => void> = [];
const MAX_CONCURRENT_CACHE = 4;
let activeCacheCount = 0;

function processCacheQueue() {
  while (activeCacheCount < MAX_CONCURRENT_CACHE && cacheQueue.length > 0) {
    const task = cacheQueue.shift();
    if (task) {
      activeCacheCount++;
      task();
    }
  }
}

const MAX_CACHE_ENTRIES = 50;
const MAX_CACHE_AGE_MS = 7 * 24 * 60 * 60 * 1000;
let lastCleanupTime = 0;

async function pruneImageCacheIfNeeded() {
  const now = Date.now();
  if (now - lastCleanupTime < 60 * 1000) return;
  lastCleanupTime = now;

  try {
    const expiredCutoff = now - MAX_CACHE_AGE_MS;
    await localDB.imageCache.where('updatedAt').below(expiredCutoff).delete();

    const count = await localDB.imageCache.count();
    if (count > MAX_CACHE_ENTRIES) {
      const excess = count - MAX_CACHE_ENTRIES;
      const oldestKeys = await localDB.imageCache
        .orderBy('updatedAt')
        .limit(excess)
        .primaryKeys();
      if (oldestKeys.length > 0) {
        await localDB.imageCache.bulkDelete(oldestKeys);
      }
    }
  } catch {}
}

export function queueImageCache(targetUrl: string, onCached?: (objUrl: string) => void) {
  if (inFlightRequests.has(targetUrl) || failedUrls.has(targetUrl)) return;
  inFlightRequests.add(targetUrl);

  const runTask = async () => {
    try {
      const response = await fetch(targetUrl, { cache: 'force-cache' });
      if (response.ok) {
        const blob = await response.blob();
        if (blob.type === 'image/gif' && blob.size < 100) {
          failedUrls.add(targetUrl);
          return;
        }
        await localDB.imageCache.put({ url: targetUrl, blob, updatedAt: Date.now() });
        const objUrl = URL.createObjectURL(blob);
        blobUrlMap.set(targetUrl, objUrl);
        if (onCached) onCached(objUrl);
        pruneImageCacheIfNeeded();
      }
    } catch {
    } finally {
      inFlightRequests.delete(targetUrl);
      activeCacheCount--;
      processCacheQueue();
    }
  };

  cacheQueue.push(runTask);
  processCacheQueue();
}

export function useCachedImage(url?: string | null): string | null | undefined {
  const initialOptimized = url ? (optimizeCloudinaryUrl(url) || url) : null;
  const [cachedSrc, setCachedSrc] = useState<string | null>(() => {
    if (!initialOptimized) return null;
    return blobUrlMap.get(initialOptimized) || null;
  });

  useEffect(() => {
    let isMounted = true;

    if (!url) {
      setCachedSrc(null);
      return;
    }

    const optimizedUrl = optimizeCloudinaryUrl(url) || url;

    if (blobUrlMap.has(optimizedUrl)) {
      setCachedSrc(blobUrlMap.get(optimizedUrl)!);
      return;
    }

    if (url.includes('googleusercontent.com') || failedUrls.has(optimizedUrl) || failedUrls.has(url)) {
      setCachedSrc(optimizedUrl);
      return;
    }

    async function checkDbAndCache() {
      try {
        const cached = await localDB.imageCache.get(optimizedUrl);
        if (cached && cached.blob) {
          if (cached.blob.size < 100 && cached.blob.type === 'image/gif') {
            await localDB.imageCache.delete(optimizedUrl);
            failedUrls.add(optimizedUrl);
            if (isMounted) setCachedSrc(optimizedUrl);
            return;
          }
          const objUrl = URL.createObjectURL(cached.blob);
          blobUrlMap.set(optimizedUrl, objUrl);
          if (isMounted) setCachedSrc(objUrl);
          return;
        }

        if (isMounted) setCachedSrc(optimizedUrl);

        queueImageCache(optimizedUrl, (objUrl) => {
          if (isMounted) setCachedSrc(objUrl);
        });
      } catch {
        if (isMounted) setCachedSrc(optimizedUrl);
      }
    }

    checkDbAndCache();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return cachedSrc || (url ? (optimizeCloudinaryUrl(url) || url) : url);
}
