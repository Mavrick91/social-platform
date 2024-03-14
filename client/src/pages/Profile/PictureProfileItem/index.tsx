import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Picture } from '@/generated/graphql.tsx';
import { useMutation } from '@apollo/client';
import { DELETE_PICTURE_MUTATION } from '@/graphql/mutation/picture.ts';
import UploadPicture from '@/components/UploadPicture';
import { DialogTrigger } from '@/components/ui/dialog.tsx';

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
      <Card className="rounded-md overflow-hidden bg-slate-50 flex justify-between items-center px-4 py-2">
        <div className="grid gap-2 items-center grid-cols-12 w-full">
          <img
            src={picture.fileUrl}
            className="size-16 rounded-full shadow-lg col-span-1 shrink-0 aspect-square"
            alt={picture.title}
          />
          <Label className="ml-8 text-lg col-span-3">{picture.title}</Label>
          <p className="text-gray-600 col-span-6">
            {picture?.description || 'No description provided.'}
          </p>
        </div>
        <div className="flex gap-2">
          <UploadPicture
            refetch={refetch}
            defaultValues={{
              id: picture.id,
              title: picture.title,
              description: picture.description || '',
              data: picture.fileUrl,
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
