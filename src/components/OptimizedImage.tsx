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
    const w = width ? width.toString().replace('px', '') : '1920';
    // Pour s'assurer de matcher les sizes de Vercel, il faut idéalement passer un "w" valide, 
    // l'optimiseur de Vercel fera le snap vers la taille supérieure la plus proche.
    finalSrc = `/_vercel/image?url=${encodeURIComponent(src)}&w=${w}&q=${quality}`;
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
