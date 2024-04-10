import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import useDeleteCollection from '@/hooks/graphql/useDeleteCollection';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Fragment, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AddPictures } from './AddPictures';
import { EditCollectionName } from './EditCollectionName';

const formSchema = z.object({
  collectionName: z.string().min(1, { message: 'Collection name is required' }),
});

export type FormData = z.infer<typeof formSchema>;

type Props = {
  children: React.ReactNode;
  collectionId: number;
  collectionName: string;
};

export default function CollectionAction({
  children,
  collectionId,
  collectionName,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [collectionNameDialogOpen, setCollectionNameDialogOpen] =
    useState(false);
  const [addPictureDialogOpen, setAddPictureDialogOpen] = useState(false);
  const user = useUserInfo();
  const navigate = useNavigate();

  const [deleteCollection, { loading }] = useDeleteCollection();

  const handleAction = async (actionType: string) => {
    try {
      if (actionType === 'delete-collection') {
        await deleteCollection({ variables: { collectionId } });
        navigate(`/${user.username}/saved`);
      } else if (actionType === 'edit') {
        setCollectionNameDialogOpen(true);
      } else if (actionType === 'add') {
        setAddPictureDialogOpen(true);
      }
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const actions = useMemo(
    () => [
      {
        type: 'delete-collection',
        label: 'Delete collection',
        className: 'text-red-500 font-bold',
      },
      { type: 'add', label: 'Add from saved' },
      { type: 'edit', label: 'Edit collection' },
      { type: 'cancel', label: 'Cancel' },
    ],
    []
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button>{children}</button>
        </DialogTrigger>
        <DialogContent className="p-0 gap-0 rounded-lg max-w-sm">
          {actions.map((action, index) => (
            <Fragment key={index}>
              <button
                type="button"
                className={`text-center py-3.5 text-sm ${action.className || ''}`}
                onClick={() => handleAction(action.type)}
              >
                <div className="flex justify-center items-center">
                  {action.label}
                  {loading && action.type === 'delete' && (
                    <LoadingSpinner className="ml-2 h-4 w-4 animate-spin" />
                  )}
                </div>
              </button>
              <Separator className="last:hidden" />
            </Fragment>
          ))}
        </DialogContent>
      </Dialog>

      {collectionNameDialogOpen && (
        <EditCollectionName
          collectionName={collectionName}
          collectionId={collectionId}
          isOpen={collectionNameDialogOpen}
          setIsOpen={setCollectionNameDialogOpen}
        />
      )}
      {addPictureDialogOpen && (
        <AddPictures
          isOpen={addPictureDialogOpen}
          setIsOpen={setAddPictureDialogOpen}
          collectionId={collectionId}
        />
      )}
    </>
  );
}
