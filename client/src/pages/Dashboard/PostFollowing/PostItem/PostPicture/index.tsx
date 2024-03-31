import { PictureFragmentFragment } from '@/__generated__/graphql';

type Props = {
  picture: PictureFragmentFragment;
};

export default function PostPicture({ picture }: Props) {
  return (
    <div>
      <div className="mb-1">
        <img alt="picture" className="w-full" src={picture.sizes.medium} />
      </div>
    </div>
  );
}
