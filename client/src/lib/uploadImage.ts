import axios from '@/axios.ts';

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('/uploads/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const { fileUrl, fileKey } = response.data;

    return {
      fileUrl,
      fileKey,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export default uploadImage;
