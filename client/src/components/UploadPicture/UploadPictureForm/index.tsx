import FileUploadArea from '@/components/UploadPicture/FileUploadArea';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';
import * as z from 'zod';
import { ACCEPTED_IMAGE_TYPES } from '@/constant/image.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import {
  UPDATE_PICTURE_MUTATION,
  UPLOAD_PICTURE_MUTATION,
} from '@/graphql/mutation/picture.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { selectAuthenticatedUser } from '@/features/users/selectors.ts';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import uploadImage from '@/lib/uploadImage.ts';

const schemaWithFile = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  file: z
    .any()
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
});

const schemaWithoutFile = schemaWithFile.omit({ file: true });

export type FormDataWithFile = z.infer<typeof schemaWithFile>;
export type FormDataWithoutFile = z.infer<typeof schemaWithoutFile>;

type Props = {
  defaultValues?: FormDataWithoutFile & {
    id: number;
    data: string;
  };
  setOpen: (value: boolean) => void;
  refetch: () => void;
  setErrorMutation: Dispatch<SetStateAction<string | null>>;
};

function UploadPictureForm({
  defaultValues,
  setOpen,
  refetch,
  setErrorMutation,
}: Props) {
  const schema = defaultValues?.data ? schemaWithoutFile : schemaWithFile;
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const [uploadStatus, setUploadStatus] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm<FormDataWithFile | FormDataWithoutFile>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const [uploadPicture, { loading: uploadLoading, error: errorUploading }] =
    useMutation(UPLOAD_PICTURE_MUTATION);
  const [updatePicture, { loading: updateLoading, error: errorUpdating }] =
    useMutation(UPDATE_PICTURE_MUTATION);

  useEffect(() => {
    if (errorUploading || errorUpdating) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const errorCode = errorUploading?.networkError?.statusCode;

      if (errorCode === 413) setErrorMutation('Size of the file is too large.');
      else if (errorUploading) setErrorMutation(errorUploading.message);
      else if (errorUpdating) setErrorMutation(errorUpdating.message);
    }
  }, [errorUpdating, errorUploading, setErrorMutation]);

  const onSubmit = async (data: FormDataWithFile | FormDataWithoutFile) => {
    try {
      if (defaultValues) {
        const { title, description } = data as FormDataWithoutFile;

        const variables = {
          id: defaultValues.id,
          input: {
            title,
            description,
          },
        };
        await updatePicture({ variables });
      } else if ('file' in data) {
        setUploadStatus(true);

        const { title, description, file } = data as FormDataWithFile;
        const { fileUrl, fileKey } = await uploadImage(file);

        const variables = {
          input: {
            title,
            description,
            fileUrl,
            fileName: fileKey,
            authorId: userInfo.sub,
          },
        };
        await uploadPicture({ variables });
      }

      refetch();
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
        <FileUploadArea
          editable={!defaultValues}
          defaultPreview={defaultValues?.data}
          register={register}
          error={errorFile}
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
