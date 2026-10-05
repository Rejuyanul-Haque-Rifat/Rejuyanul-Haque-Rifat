export function optimizeCloudinaryUrl(url: string, width = 800, quality = 'auto'): string {
  if (!url || !url.includes('cloudinary.com')) return url;
  if (url.includes('/upload/')) {
    return url.replace('/upload/', '/upload/f_auto,q_' + quality + ',w_' + width + '/');
  }
  return url;
}
