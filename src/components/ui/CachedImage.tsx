import React, { useState, useEffect, useRef } from 'react';
import { useCachedImage } from '../../hooks/useCachedImage';
import { optimizeCloudinaryUrl } from '../../utils/upload';

interface CachedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  fallbackIcon?: string;
  imageClassName?: string;
  fallback?: React.ReactNode;
}

const CachedImage: React.FC<CachedImageProps> = ({
  src,
  alt = '',
  className = '',
  imageClassName = '',
  fallbackIcon = 'fa-image',
  fallback,
  style,
  onLoad,
  onError,
  ...props
}) => {
  const cachedSrc = useCachedImage(src);
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const fallbackCandidates = React.useMemo(() => {
    const list: string[] = [];
    if (cachedSrc) list.push(cachedSrc);
    if (src) {
      const opt = optimizeCloudinaryUrl(src);
      if (opt && !list.includes(opt)) list.push(opt);
      const norm = src.replace('res.cloudinary.com/dghxevycq/', 'res.cloudinary.com/h5wrfd65/').replace('res.cloudinary.com/woozq7vr/', 'res.cloudinary.com/h5wrfd65/');
      if (!list.includes(norm)) list.push(norm);
      const raw = norm.replace(/\/upload\/[^/]+\/v/, '/upload/v');
      if (!list.includes(raw)) list.push(raw);
      if (!list.includes(src)) list.push(src);
      if (src.toLowerCase().endsWith('.webp')) {
        const jpgFallback = src.replace(/\.webp$/i, '.jpg');
        if (!list.includes(jpgFallback)) list.push(jpgFallback);
      }
    }
    return list;
  }, [src, cachedSrc]);

  useEffect(() => {
    setImageError(false);
    setIsLoaded(false);
    setFallbackIndex(0);
  }, [src]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 1) {
      setIsLoaded(true);
    }
  }, [fallbackIndex, cachedSrc]);

  const displaySrc = fallbackCandidates[fallbackIndex] || null;

  const handleImageError = (e?: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallbackIndex + 1 < fallbackCandidates.length) {
      setFallbackIndex(prev => prev + 1);
    } else {
      setImageError(true);
      if (e && onError) {
        onError(e);
      }
    }
  };

  const aspectRatioStyle = props.width && props.height 
    ? { aspectRatio: `${props.width} / ${props.height}` } 
    : {};

  if (!displaySrc || imageError) {
    if (fallback) {
      return (
        <div className={`overflow-hidden ${className}`} style={{ ...aspectRatioStyle, ...style }}>
          {fallback}
        </div>
      );
    }
    const defaultClasses = "bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500";
    const cleanedClassName = className.replace('object-cover', '');
    return (
      <div className={`${defaultClasses} ${cleanedClassName}`} style={{ ...aspectRatioStyle, ...style }}>
        {fallbackIcon && <i className={`fa-solid ${fallbackIcon} text-xl opacity-60`}></i>}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden isolate bg-gray-100 dark:bg-gray-800 ${className}`} style={{ ...aspectRatioStyle, ...style }}>
      {!isLoaded && (
        <div className="absolute inset-0 gemini-loader-bg overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-cyan-400/25 via-indigo-500/25 to-purple-500/20 blur-xl animate-aurora-float pointer-events-none" />
          <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full bg-gradient-to-bl from-purple-500/25 via-pink-500/20 to-indigo-500/20 blur-xl animate-aurora-float-reverse pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 dark:via-white/10 to-transparent animate-gemini-sweep pointer-events-none" />
        </div>
      )}
      <img
        ref={imgRef}
        key={displaySrc}
        src={displaySrc}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        decoding="async"
        onLoad={(e) => {
          const target = e.currentTarget;
          if (target.naturalWidth <= 1 && target.naturalHeight <= 1) {
            handleImageError(e);
            return;
          }
          setIsLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          handleImageError(e);
        }}
        className={`w-full h-full object-cover relative z-10 transition-all duration-700 ease-out transform-gpu ${
          isLoaded 
            ? 'blur-0 scale-100 opacity-100' 
            : 'blur-md scale-105 opacity-0'
        } ${imageClassName || ''}`}
        {...props}
      />
    </div>
  );
};

export default CachedImage;
