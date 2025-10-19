import { useState, useCallback } from 'react';

export function useImageError() {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = useCallback((src: string) => {
    setFailedImages(prev => new Set(prev).add(src));
  }, []);

  const getImageSrc = useCallback((originalSrc: string, fallbackSrc: string = '/placeholder-token.svg') => {
    return failedImages.has(originalSrc) ? fallbackSrc : originalSrc;
  }, [failedImages]);

  return { handleImageError, getImageSrc };
}
