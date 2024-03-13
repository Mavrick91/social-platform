import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FileUploadArea from '@/components/UploadPicture/FileUploadArea';
import { ACCEPTED_IMAGE_TYPES } from '@/constant/image.ts';
import { Textarea } from '@/components/ui/textarea.tsx';
import { convertToBase64 } from '@/lib/utils.ts';
import { useMutation } from '@apollo/client';
import { UPLOAD_PICTURE_MUTATION } from '@/graphql/mutation/picture.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { selectAuthenticatedUser } from '@/features/users/selectors.ts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { useState } from 'react';

const MAX_FILE_SIZE = 500000;

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  file: z
    .instanceof(File)
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
});

type FormData = z.infer<typeof schema>;

type Props = {
  refetch: () => void;
};

function UploadPictureDialog({ refetch }: Props) {
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [uploadPicture, { loading, error }] = useMutation(
    UPLOAD_PICTURE_MUTATION
  );

  const onSubmit = async (data: FormData) => {
    try {
      const { title, description, file } = data;
      const base64Data = await convertToBase64(file);
      const variables = {
        input: { title, description, data: base64Data, authorId: userInfo.sub },
      };

      await uploadPicture({ variables });
      refetch();
      setOpen(false);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="flex items-center w-full justify-between"
        asChild
      >
        <div>
          <span>Photos</span>
          <Button className="gap-2">
            <Plus />
            Upload
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        {error && (
          <Alert className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <DialogHeader>
          <DialogTitle>Upload a Picture</DialogTitle>
          <DialogDescription>
            Please fill in the details for the picture you want to upload.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-3">
            <FileUploadArea
              register={register}
              error={errors.file?.message}
              setValue={setValue}
              clearErrors={clearErrors}
            />
            <div className="flex flex-col w-full">
              <div>
                <Input
                  label="Title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Enter title"
                  {...register('title')}
                  error={errors.title?.message}
                />
              </div>
              <div className="mt-4">
                <Textarea
                  label="Description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  placeholder="Enter description"
                  {...register('description')}
                  error={errors.description?.message}
                  rows={4}
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="mt-4" loading={loading}>
            Upload
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPictureDialog;
