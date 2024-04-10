import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadResolver } from './thread.resolver';

@Module({
  providers: [ThreadService, ThreadResolver],
  exports: [ThreadService],
})
export class ThreadModule {}
