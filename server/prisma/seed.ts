import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import sharp from 'sharp';
import axios from 'axios';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const prisma = new PrismaClient();
const s3Client = new S3Client({ region: process.env.AWS_REGION });

async function convertAndUploadImage(
  imageBuffer: Buffer,
  key: string,
  options?: { width?: number; height?: number },
) {
  let resizeOptions = {};
  if (options?.width || options?.height) {
    resizeOptions = {
      width: options.width,
      height: options.height,
      fit: 'cover',
      withoutEnlargement: true,
    };
  }

  const webpData = await sharp(imageBuffer)
    .resize(resizeOptions)
    .toFormat('webp')
    .toBuffer();

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: webpData,
    ContentType: 'image/webp',
  };

  await s3Client.send(new PutObjectCommand(params));

  return params;
}

async function fetchAndProcessImage(url: string, baseKey: string) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const originalImageBuffer = response.data;

  const originalParams = await convertAndUploadImage(
    originalImageBuffer,
    `${baseKey}.webp`,
  );

  const thumbnailParams = await convertAndUploadImage(
    originalImageBuffer,
    `${baseKey}-thumbnail.webp`,
    { width: 300, height: 300 },
  );

  const mediumParams = await convertAndUploadImage(
    originalImageBuffer,
    `${baseKey}-medium.webp`,
    { width: 512 },
  );

  const smallParams = await convertAndUploadImage(
    originalImageBuffer,
    `${baseKey}-small.webp`,
    { width: 170 },
  );

  return {
    original: `https://${originalParams.Bucket}.s3.amazonaws.com/${originalParams.Key}`,
    thumbnail: `https://${thumbnailParams.Bucket}.s3.amazonaws.com/${thumbnailParams.Key}`,
    medium: `https://${mediumParams.Bucket}.s3.amazonaws.com/${mediumParams.Key}`,
    small: `https://${smallParams.Bucket}.s3.amazonaws.com/${smallParams.Key}`,
  };
}

async function main() {
  const password = 'test';
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create mock users
  const mockUsers = Array.from({ length: 10 }, () => {
    return {
      email: faker.internet.email().toLowerCase(),
      password: hashedPassword,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      avatar: faker.image.avatar(),
      username: faker.internet.userName().toLowerCase(),
      isMock: true,
    };
  });

  const createdUsers = await prisma.user.createMany({
    data: mockUsers,
  });

  const userIds = await prisma.user.findMany({
    select: { id: true },
    take: createdUsers.count,
  });

  for (const user of userIds) {
    await prisma.collection.create({
      data: {
        name: 'All posts',
        nameId: 'all-posts',
        userId: user.id,
        isDefault: true,
      },
    });
  }

  const mockPictures = await Promise.all(
    Array.from({ length: 20 }, async (_, i) => {
      const imageUrl = 'https://loremflickr.com/1400/900';
      const baseKey = `posts/post-${i}`;
      const sizes = await fetchAndProcessImage(imageUrl, baseKey);

      return {
        fileName: faker.system.commonFileName('webp'),
        description: faker.lorem.sentence(),
        userId: faker.helpers.arrayElement(userIds).id,
        sizes: sizes,
      };
    }),
  );

  const createdPictures = await prisma.picture.createMany({
    data: mockPictures,
  });

  const pictureIds = await prisma.picture.findMany({
    select: { id: true },
    take: createdPictures.count,
  });

  // Create mock comments
  const mockComments = Array.from({ length: 50 }, () => ({
    content: faker.lorem.paragraph(),
    userId: faker.helpers.arrayElement(userIds).id,
    pictureId: faker.helpers.arrayElement(pictureIds).id,
  }));

  await prisma.comment.createMany({
    data: mockComments,
  });

  console.log('Mock data seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
