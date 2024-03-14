import { Module } from '@nestjs/common';
import { PictureResolver } from './picture.resolver';
import { PictureService } from './picture.service';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/s3.service';

@Module({
  providers: [PictureResolver, PictureService, PrismaService, S3Service],
})
export class PictureModule {}
