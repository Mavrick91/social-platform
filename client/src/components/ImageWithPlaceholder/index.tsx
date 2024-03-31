import { useEffect, useState } from 'react';

type Props = {
  largeImageUrl: string;
  placeholderImageUrl: string;
};

const ImageWithPlaceholder = ({
  largeImageUrl,
  placeholderImageUrl,
}: Props) => {
  const [currentImageUrl, setCurrentImageUrl] = useState(placeholderImageUrl);

  useEffect(() => {
    const img = new Image();
    img.src = largeImageUrl;
    img.onload = () => {
      setCurrentImageUrl(largeImageUrl);
    };
    img.onerror = () => {
      console.error('Failed to load the image:', largeImageUrl);
    };
  }, [largeImageUrl]);

  return <img src={currentImageUrl} alt="Descriptive alt text" />;
};

export default ImageWithPlaceholder;
