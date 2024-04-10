import { Module } from '@nestjs/common';
import { ThreadModule } from '../thread/thread.module';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';

@Module({
  imports: [ThreadModule],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}
