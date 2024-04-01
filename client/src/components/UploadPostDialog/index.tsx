import { PictureFragmentFragment } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useUpdatePicture } from '@/hooks/graphql/useUpdatePicture';
import { useUploadPicture } from '@/hooks/graphql/useUploadPicture';
import uploadImage from '@/lib/uploadImage';
import { cn } from '@/lib/utils';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import ExitDialog from '../ExitDialog';
import AddCaptionPost from './AddCaptionPost';
import UploadPictureFromComputer from './UploadPictureFromComputer';

const schema = z.object({
  picture: z.any(),
  description: z
    .string()
    .max(2200, 'Description is too long')
    .transform((v) => v.trim()),
  altText: z.string(),
  hideLikesAndViewCounts: z.boolean().optional(),
  disableComments: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  onClose: () => void;
  picture?: PictureFragmentFragment;
  title: string;
  buttonSubmitText: string;
  backButton: ReactNode;
};

export default function UploadPostDialog({
  onClose,
  picture,
  title,
  buttonSubmitText,
  backButton,
}: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [previewPicture, setPreviewPicture] = useState<string | null>(null);
  const user = useUserInfo();
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [callbackClickDiscard, setCallbackClickDiscard] =
    useState<() => void>();

  const [uploadPicture, { loading: uploadLoading }] = useUploadPicture(
    user.username
  );
  const [updatePicture, { loading: updateLoading }] = useUpdatePicture();

  const defaultValues = useMemo(() => {
    if (picture) {
      return {
        picture: {
          name: picture.fileName,
        },
        description: picture.description || '',
        altText: picture.altText,
        hideLikesAndViewCounts: picture.hideLikesAndViewCounts,
        disableComments: picture.disableComments,
      };
    }

    return {
      picture: null,
      description: '',
      altText: '',
      hideLikesAndViewCounts: false,
      disableComments: false,
    };
  }, [picture]);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const pictureWatch = methods.watch('picture');
  console.log('🚀 ~ pictureWatch:', pictureWatch);

  const handleDiscardChanges = () => {
    onClose();
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    if (pictureWatch?.name) {
      setCallbackClickDiscard(handleDiscardChanges);
      setShowExitDialog(true);
    } else {
      handleDiscardChanges();
    }
  };

  const handleGoBackPreviousStep = () => {
    setCurrentStep(0);
    setPreviewPicture(null);
    methods.setValue('picture', null);
  };

  const handleClickArrowLeft = () => {
    if (picture) handleDiscardChanges();
    else {
      setCallbackClickDiscard(handleGoBackPreviousStep);
      setShowExitDialog(true);
    }
  };

  useEffect(() => {
    if (pictureWatch?.name) {
      setCurrentStep(1);
      if (picture) setPreviewPicture(picture.sizes.original);
      else setPreviewPicture(URL.createObjectURL(pictureWatch));
    } else {
      setCurrentStep(0);
    }
  }, [picture, pictureWatch]);

  const onSubmit = async (data: FormData) => {
    try {
      if (picture) {
        const variables = {
          id: picture.id,
          input: {
            description: data.description,
            altText: data.altText,
            hideLikesAndViewCounts: data.hideLikesAndViewCounts,
            disableComments: data.disableComments,
          },
        };

        await updatePicture({ variables });
      } else {
        setUploadStatus(true);
        const { fileName, sizes } = await uploadImage(data.picture);

        const defaultAltText = `Photo by ${user.firstName} ${user.lastName} on ${moment().format('MMMM Do, YYYY')}. May be an image of text.`;

        const variables = {
          input: {
            description: data.description,
            altText: data.altText ? data.altText : defaultAltText,
            fileName,
            sizes,
            hideLikesAndViewCounts: data.hideLikesAndViewCounts,
            disableComments: data.disableComments,
          },
        };

        await uploadPicture({ variables });
      }
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploadStatus(false);
      onClose();
    }
  };

  if (currentStep === -1) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleCloseModal}>
        <DialogContent
          showClose={false}
          className={cn('p-0 gap-0 flex flex-col', {
            'min-w-[755px]': !previewPicture,
            'max-w-[1095px]': previewPicture,
          })}
        >
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div
                className={cn(
                  'flex border-b border-separator px-4 text-center py-2.5',
                  {
                    'justify-between': currentStep === 1,
                    'justify-center': currentStep === 0,
                  }
                )}
              >
                {currentStep === 1 && (
                  <button
                    type="button"
                    className="text-sm"
                    onClick={handleClickArrowLeft}
                  >
                    {backButton}
                  </button>
                )}
                <h3 className="font-bold">{title}</h3>
                {currentStep === 1 && (
                  <Button
                    variant="ghost"
                    size="none"
                    type="submit"
                    className="font-semibold"
                    loading={uploadStatus || uploadLoading || updateLoading}
                  >
                    {buttonSubmitText}
                  </Button>
                )}
              </div>
              {!previewPicture && <UploadPictureFromComputer />}
              {previewPicture && (
                <AddCaptionPost
                  previewPicture={previewPicture}
                  isEdit={!!picture}
                />
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {showExitDialog && callbackClickDiscard && (
        <ExitDialog
          handleDiscardChanges={callbackClickDiscard}
          onClose={() => setShowExitDialog(false)}
        />
      )}
    </>
  );
}
