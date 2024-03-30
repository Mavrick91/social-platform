import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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
      },
    });
  }

  const mockPictures = Array.from({ length: 20 }, () => ({
    fileUrl: faker.image.url(),
    fileName: faker.system.commonFileName('jpg'),
    description: faker.lorem.sentence(),
    userId: faker.helpers.arrayElement(userIds).id,
  }));

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
