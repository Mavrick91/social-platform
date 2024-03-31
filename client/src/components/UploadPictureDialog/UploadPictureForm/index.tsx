import { Button } from '@/components/ui/button.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { ACCEPTED_IMAGE_TYPES } from '@/constant/image.ts';
import { selectAuthenticatedUser } from '@/features/users/selectors.ts';
import { useUpdatePicture } from '@/hooks/graphql/useUpdatePicture';
import { useUploadPicture } from '@/hooks/graphql/useUploadPicture';
import uploadImage from '@/lib/uploadImage.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as z from 'zod';
import FileUploadArea from '../FileUploadArea';
import { cn } from '@/lib/utils';

const schemaWithFile = z.object({
  description: z.string().transform((val) => val.trim()),
  file: z.any().refine((file) => {
    return ACCEPTED_IMAGE_TYPES.includes(file?.[0].type);
  }, '.jpg, .jpeg, .png and .webp files are accepted.'),
});

const schemaWithoutFile = schemaWithFile.omit({ file: true });

export type FormDataWithFile = z.infer<typeof schemaWithFile>;
export type FormDataWithoutFile = z.infer<typeof schemaWithoutFile>;

type Props = {
  defaultValues?: FormDataWithoutFile & {
    id: number;
    fileUrl: string;
  };
  setOpen: (value: boolean) => void;
  setErrorMutation: Dispatch<SetStateAction<string | null>>;
};

function UploadPictureForm({
  defaultValues,
  setOpen,
  setErrorMutation,
}: Props) {
  const schema = defaultValues?.fileUrl ? schemaWithoutFile : schemaWithFile;
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const [uploadStatus, setUploadStatus] = useState(false);
  const { profileId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataWithFile | FormDataWithoutFile>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const [uploadPicture, { loading: uploadLoading, error: errorUploading }] =
    useUploadPicture(Number(profileId));
  const [updatePicture, { loading: updateLoading, error: errorUpdating }] =
    useUpdatePicture();

  useEffect(() => {
    if (errorUploading) setErrorMutation(errorUploading.message);
    if (errorUpdating) setErrorMutation(errorUpdating.message);
  }, [errorUpdating, errorUploading, setErrorMutation]);

  const onSubmit = async (data: FormDataWithFile | FormDataWithoutFile) => {
    try {
      if (defaultValues) {
        const { description } = data as FormDataWithoutFile;

        const variables = {
          id: defaultValues.id,
          input: {
            description,
          },
        };
        await updatePicture({ variables });
      } else if ('file' in data) {
        setUploadStatus(true);

        const { description, file } = data as FormDataWithFile;
        const { fileUrl, fileKey } = await uploadImage(file[0]);

        const variables = {
          input: {
            description,
            fileUrl,
            fileName: fileKey,
            userId: userInfo.id,
          },
        };
        await uploadPicture({ variables });
      }

      setOpen(false);
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setUploadStatus(false);
    }
  };

  const errorFile: string | undefined =
    'file' in errors ? errors.file?.message?.toString() : undefined;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3">
        <FileUploadArea defaultPreview={defaultValues?.fileUrl}>
          {(handleFileChange, handleDeletePreview, previewUrl) => (
            <div>
              <label
                htmlFor="file"
                className={cn(
                  'flex group justify-center w-96 h-[400px] items-center border-2 border-gray-300 border-dashed rounded-md',
                  {
                    'hover:cursor-pointer': !defaultValues,
                  }
                )}
              >
                <div
                  className={cn(
                    'relative h-full w-full flex justify-center items-center',
                    {
                      hidden: !previewUrl,
                    }
                  )}
                >
                  {!defaultValues && (
                    <div className="hidden z-20 absolute inset-0 bg-black bg-opacity-50 group-hover:block items-center justify-center">
                      <button
                        className="bg-red-500 relative top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleDeletePreview}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  <img
                    src={previewUrl!}
                    alt="Preview"
                    className="max-h-full z-10 max-w-full"
                  />
                </div>
                <div
                  className={cn('space-y-1 text-center', {
                    hidden: previewUrl,
                  })}
                >
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input
                        id="file"
                        type="file"
                        className="sr-only"
                        {...register('file')}
                        accept={ACCEPTED_IMAGE_TYPES.join(',')}
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-2">or drag and drop</p>
                  </div>
                </div>
              </label>
              {errorFile && <p className="text-red-500 text-sm">{errorFile}</p>}
            </div>
          )}
        </FileUploadArea>
        <div className="flex flex-col w-full">
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
      <Button
        type="submit"
        className="mt-4"
        loading={uploadLoading || updateLoading || uploadStatus}
      >
        Upload
      </Button>
    </form>
  );
}

export default UploadPictureForm;
