import { useState, useEffect } from 'react';
import { PictureFragmentFragment } from '@/__generated__/graphql';

type Props = {
  picture: PictureFragmentFragment;
};

export default function PostPicture({ picture }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = picture.sizes.medium;
    image.onload = () => {
      setIsLoading(false);
    };
  }, [picture.sizes.medium]);

  return (
    <div className="group relative min-h-96 col-span-1 aspect-square bg-highlight-background">
      {isLoading ? (
        <div className="mb-1 w-full h-96 flex items-center justify-center bg-highlight-background" />
      ) : (
        <div className="mb-1">
          <img alt="picture" className="w-full" src={picture.sizes.medium} />
        </div>
      )}
    </div>
  );
}
