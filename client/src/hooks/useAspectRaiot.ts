import { useState, useEffect } from 'react';
import { AspectRatio } from '@/types/picture';

function useAspectRatio(url: string): AspectRatio | null {
  const [aspectRatio, setAspectRatio] = useState<AspectRatio | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setAspectRatio({
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      });
    };
    img.onerror = () => {
      console.error(`Could not load image at ${url}`);
    };
    img.src = url;
  }, [url]);

  return aspectRatio;
}

export default useAspectRatio;
