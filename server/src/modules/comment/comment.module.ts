import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { PubSubModule } from '../pubsub/PubSub.module';

@Module({
  imports: [PubSubModule],
  providers: [CommentService, CommentResolver],
})
export class CommentModule {}
