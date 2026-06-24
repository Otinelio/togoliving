import { ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  quality?: number;
  priority?: boolean;
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  quality = 75, 
  priority = false,
  className,
  ...props 
}: OptimizedImageProps) {
  
  const isDev = import.meta.env.DEV;
  const isAbsolute = src.startsWith('http');
  
  let finalSrc = src;
  
  if (!isDev && isAbsolute) {
    let wInt = width ? parseInt(width.toString().replace('px', ''), 10) : 1920;
    if (isNaN(wInt)) wInt = 1920;
    const allowedSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
    const snappedW = allowedSizes.find(s => s >= wInt) || allowedSizes[allowedSizes.length - 1];
    
    finalSrc = `/_vercel/image?url=${encodeURIComponent(src)}&w=${snappedW}&q=${quality}`;
  }

  return (
    <img
      src={finalSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      // @ts-ignore - fetchPriority is supported in newer React but might not be in the current types
      fetchPriority={priority ? "high" : "auto"}
      className={className}
      {...props}
    />
  );
}
