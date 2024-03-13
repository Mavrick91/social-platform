import { Module } from '@nestjs/common';
import { PictureResolver } from './picture.resolver';
import { PictureService } from './picture.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PictureResolver, PictureService, PrismaService],
})
export class PictureModule {}
