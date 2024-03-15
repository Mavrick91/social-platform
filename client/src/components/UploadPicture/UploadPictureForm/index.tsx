import FileUploadArea from '@/components/UploadPicture/FileUploadArea';
import { Button } from '@/components/ui/button.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { ACCEPTED_IMAGE_TYPES } from '@/constant/image.ts';
import { selectAuthenticatedUser } from '@/features/users/selectors.ts';
import {
  UPDATE_PICTURE_MUTATION,
  UPLOAD_PICTURE_MUTATION,
} from '@/graphql/mutations/picture';
import uploadImage from '@/lib/uploadImage.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schemaWithFile = z.object({
  description: z.string().transform((val) => val.trim()),
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
    fileUrl: string;
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
  const schema = defaultValues?.fileUrl ? schemaWithoutFile : schemaWithFile;
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
        const { fileUrl, fileKey } = await uploadImage(file);

        const variables = {
          input: {
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
          defaultPreview={defaultValues?.fileUrl}
          register={register}
          error={errorFile}
          setValue={setValue}
          clearErrors={clearErrors}
        />
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
