import { Picture } from '@/__generated__/graphql';
import PictureDetailsDialog from '@/components/PictureDetailsDialog';
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx';
import { GET_PICTURE_BY_AUTHOR } from '@/graphql/queries/picture';
import { useQuery } from '@apollo/client';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import Loading from './loading';

type Props = {
  userId?: number;
};
function PictureList({ userId }: Props) {
  const { data, loading } = useQuery(GET_PICTURE_BY_AUTHOR, {
    variables: userId ? { authorId: userId } : undefined,
    fetchPolicy: 'network-only',
  });

  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);

  const handleClickPicture = (picture: Picture) => {
    setSelectedPicture(picture);
  };

  return (
    <>
      <div className="grid w-full sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1 mt-4">
        {data && !loading
          ? data.picturesByAuthor.map((picture) => (
              <Dialog key={picture.id}>
                <PictureDetailsDialog
                  trigger={
                    <DialogTrigger
                      asChild
                      className="col-span-1 lg:col-span-2 aspect-square"
                    >
                      <button
                        key={picture.id}
                        onClick={() => handleClickPicture(picture)}
                        className="h-full group relative"
                      >
                        <img
                          alt="Photo"
                          className="aspect-square overflow-hidden border border-slate-200 object-cover"
                          src={picture.fileUrl}
                        />
                        <div className="hidden z-20 text-white gap-3 absolute inset-0 bg-black bg-opacity-50 group-hover:flex items-center justify-center">
                          <MessageCircle fill="white" size={32} />
                          <span className="text-2xl">
                            {picture._count?.comments}
                          </span>
                        </div>
                      </button>
                    </DialogTrigger>
                  }
                  selectedPicture={selectedPicture!}
                />
              </Dialog>
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <Loading key={index} />
            ))}
      </div>
    </>
  );
}

export default PictureList;
