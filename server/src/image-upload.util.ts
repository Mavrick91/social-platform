import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function convertAndUploadImage(
  imageBuffer: Buffer,
  baseKey: string,
  sizes: { name: string; width?: number; height?: number }[],
) {
  const urls = {};

  for (const size of sizes) {
    let resizeOptions = {};
    if (size.width || size.height) {
      resizeOptions = {
        width: size.width,
        height: size.height,
        fit: 'cover',
        withoutEnlargement: true,
      };
    }

    const webpData = await sharp(imageBuffer)
      .resize(resizeOptions)
      .toFormat('webp')
      .toBuffer();

    const key = `${baseKey}-${size.name}.webp`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: webpData,
      ContentType: 'image/webp',
    };

    await s3Client.send(new PutObjectCommand(params));

    urls[size.name] = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
  }

  return urls;
}
