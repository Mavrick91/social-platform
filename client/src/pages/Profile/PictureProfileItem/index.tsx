import UploadPicture from '@/components/UploadPicture';
import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { DialogTrigger } from '@/components/ui/dialog.tsx';
import { Picture } from '@/generated/graphql.tsx';
import { DELETE_PICTURE_MUTATION } from '@/graphql/mutations/picture';
import { useMutation } from '@apollo/client';

type Props = {
  picture: Picture;
  refetch: () => void;
};

function PictureProfileItem({ picture, refetch }: Props) {
  const [deletePicture, { loading: deletePictureLoading }] = useMutation(
    DELETE_PICTURE_MUTATION
  );
  const handleDeletePicture = async (id: number) => {
    try {
      await deletePicture({ variables: { id } });
      refetch();
    } catch (error) {
      console.error('Error deleting picture', error);
    }
  };

  return (
    <>
      <Card className="rounded-md overflow-hidden bg-slate-50 flex justify-between items-center p-4">
        <div className="flex gap-4 md:gap-2 items-center w-full">
          <img
            src={picture.fileUrl}
            className="size-10 md:size-14 rounded-full shadow-lg aspect-square"
            alt="Picture"
          />

          <p className="text-gray-600 ml-10">
            {picture?.description || 'No description provided.'}
          </p>
        </div>
        <div className="flex gap-2">
          <UploadPicture
            refetch={refetch}
            defaultValues={{
              id: picture.id,
              description: picture.description || '',
              fileUrl: picture.fileUrl,
            }}
            trigger={
              <DialogTrigger asChild>
                <Button variant="ghost">Edit</Button>
              </DialogTrigger>
            }
          />

          <Button
            variant="destructive"
            onClick={() => handleDeletePicture(picture.id)}
            loading={deletePictureLoading}
          >
            Delete
          </Button>
        </div>
      </Card>
    </>
  );
}

export default PictureProfileItem;
