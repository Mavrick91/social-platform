import { Module } from '@nestjs/common';
import { LikeService } from './like.service';

@Module({
  providers: [LikeService],
  exports: [LikeService], // export the service if it's used in other modules
})
export class LikeModule {}
