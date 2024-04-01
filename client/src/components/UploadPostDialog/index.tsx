import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AddCaptionPost from './AddCaptionPost';
import UploadPictureFromComputer from './UploadPictureFromComputer';
import uploadImage from '@/lib/uploadImage';
import { useUploadPicture } from '@/hooks/graphql/useUploadPicture';
import { useUserInfo } from '@/providers/UserInfoProvider';
import moment from 'moment';
import { toast } from 'react-toastify';
import ExitDialog from '../ExitDialog';

const schema = z.object({
  picture: z.any(),
  description: z.string().max(2200, 'Description is too long'),
  altText: z.string(),
  hideLikesAndViewCounts: z.boolean().optional(),
  disableComments: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  onClose: () => void;
};

export default function UploadPostDialog({ onClose }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [previewPicture, setPreviewPicture] = useState<string | null>(null);
  const user = useUserInfo();
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [callbackClickDiscard, setCallbackClickDiscard] =
    useState<() => void>();

  const [uploadPicture, { loading }] = useUploadPicture(user.username);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      picture: null,
      description: '',
      altText: '',
      hideLikesAndViewCounts: false,
      disableComments: false,
    },
  });

  const pictureWatch = methods.watch('picture');

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
    setCallbackClickDiscard(handleGoBackPreviousStep);
    setShowExitDialog(true);
  };

  useEffect(() => {
    if (pictureWatch?.name) {
      setCurrentStep(1);
      setPreviewPicture(URL.createObjectURL(pictureWatch));
    } else {
      setCurrentStep(0);
    }
  }, [pictureWatch]);

  const onSubmit = async (data: FormData) => {
    try {
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
                  'font-bold flex border-b border-separator px-4 text-center py-2.5',
                  {
                    'justify-between': currentStep === 1,
                    'justify-center': currentStep === 0,
                  }
                )}
              >
                {currentStep === 1 && (
                  <button type="button" onClick={handleClickArrowLeft}>
                    <ArrowLeft />
                  </button>
                )}
                <h3>Create new post</h3>
                {currentStep === 1 && (
                  <Button
                    variant="ghost"
                    size="none"
                    type="submit"
                    loading={uploadStatus || loading}
                  >
                    Share
                  </Button>
                )}
              </div>
              {!previewPicture && <UploadPictureFromComputer />}
              {previewPicture && (
                <AddCaptionPost previewPicture={previewPicture} />
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
