import { Module } from '@nestjs/common';
import { ThoughtService } from './thought.service';
import { ThoughtResolver } from './thought.resolver';

@Module({
  providers: [ThoughtService, ThoughtResolver],
})
export class ThoughtModule {}
