import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ACCEPTED_IMAGE_TYPES } from '@/constant/image.ts';

type FileUploadAreaProps = {
  register: ReturnType<typeof useForm>['register'];
  setValue: ReturnType<typeof useForm>['setValue'];
  clearErrors: ReturnType<typeof useForm>['clearErrors'];
  error: string | undefined;
};

const FileUploadArea = ({
  register,
  error,
  setValue,
  clearErrors,
}: FileUploadAreaProps) => {
  const id = useId();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isImageFile = (file: File) => {
    return ACCEPTED_IMAGE_TYPES.includes(file.type);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && isImageFile(file)) {
      setPreviewUrl(URL.createObjectURL(file));
      setValue('file', file);
    } else {
      setPreviewUrl(null);
      setValue('file', null);
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
        className="flex group justify-center w-96 h-[400px] items-center border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
      >
        {previewUrl ? (
          <div className="relative h-full w-full flex justify-center items-center">
            <div className="hidden z-20 absolute inset-0 bg-black bg-opacity-50 group-hover:block items-center justify-center">
              <button
                className="bg-red-500 relative top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDeletePreview}
              >
                Delete
              </button>
            </div>
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
            >
              {/* SVG icon */}
            </svg>
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
            <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
          </div>
        )}
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FileUploadArea;
