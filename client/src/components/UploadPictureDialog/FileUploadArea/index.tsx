import { ACCEPTED_IMAGE_TYPES } from '@/constant/image.ts';
import { useState } from 'react';

type FileUploadAreaProps = {
  defaultPreview?: string | null;
  children: (
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleDeletePreview: (e: React.MouseEvent<HTMLButtonElement>) => void,
    previewUrl?: string | null
  ) => JSX.Element;
};

const FileUploadArea = ({ children, defaultPreview }: FileUploadAreaProps) => {
  const [previewUrl, setPreviewUrl] =
    useState<typeof defaultPreview>(defaultPreview);

  const isImageFile = (file: File) => {
    return ACCEPTED_IMAGE_TYPES.includes(file.type);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && isImageFile(file)) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDeletePreview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPreviewUrl(null);
  };

  return children(handleFileChange, handleDeletePreview, previewUrl);
};

export default FileUploadArea;
