import { useId, useState } from 'react';
import {
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { ACCEPTED_IMAGE_TYPES } from '@/constant/image.ts';
import { cn } from '@/lib/utils.ts';
import {
  FormDataWithFile,
  FormDataWithoutFile,
} from '@/components/UploadPicture/UploadPictureForm';

type FileUploadAreaProps = {
  register: UseFormRegister<FormDataWithFile | FormDataWithoutFile>;
  setValue: UseFormSetValue<FormDataWithFile | FormDataWithoutFile>;
  clearErrors: UseFormClearErrors<FormDataWithFile | FormDataWithoutFile>;
  error: string | undefined;
  defaultPreview?: string | null;
  editable: boolean;
};

const FileUploadArea = ({
  register,
  error,
  setValue,
  clearErrors,
  defaultPreview,
  editable,
}: FileUploadAreaProps) => {
  const id = useId();
  const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(
    defaultPreview
  );

  const isImageFile = (file: File) => {
    return ACCEPTED_IMAGE_TYPES.includes(file.type);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && isImageFile(file)) {
      setPreviewUrl(URL.createObjectURL(file));
      setValue('file', file, {
        shouldValidate: true,
      });
    } else {
      setPreviewUrl(null);
      setValue('file', null, {
        shouldValidate: true,
      });
    }
  };

  const handleDeletePreview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPreviewUrl(null);
    clearErrors('file');
  };

  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          'flex group justify-center w-96 h-[400px] items-center border-2 border-gray-300 border-dashed rounded-md',
          {
            'hover:cursor-pointer': editable,
          }
        )}
      >
        {previewUrl ? (
          <div className="relative h-full w-full flex justify-center items-center">
            {editable && (
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
              src={previewUrl}
              alt="Preview"
              className="max-h-full z-10 max-w-full"
            />
          </div>
        ) : (
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor={id}
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id={id}
                  type="file"
                  className="sr-only"
                  accept={ACCEPTED_IMAGE_TYPES.join(',')}
                  {...register('file')}
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-2">or drag and drop</p>
            </div>
          </div>
        )}
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FileUploadArea;
