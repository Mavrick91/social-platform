import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CollectionModule } from './modules/collection/collection.module';
import { CollectionResolver } from './modules/collection/collection.resolver';
import { CommentModule } from './modules/comment/comment.module';
import { FollowModule } from './modules/follow/follow.module';
import { LikeModule } from './modules/like/like.module';
import { LikeResolver } from './modules/like/like.resolver';
import { MessageModule } from './modules/message/message.module';
import { NotificationModule } from './modules/notification/notification.module';
import { NotificationResolver } from './modules/notification/notification.resolver';
import { PictureModule } from './modules/picture/picture.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { PubSubModule } from './modules/pubsub/PubSub.module';
import { S3Module } from './modules/s3/s3.module';
import { ThoughtModule } from './modules/thought/thought.module';
import { ThoughtResolver } from './modules/thought/thought.resolver';
import { ThoughtService } from './modules/thought/thought.service';
import { ThreadModule } from './modules/thread/thread.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';
import GraphQLJSON from './scalars';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        scalarsMap: [{ type: GraphQLJSON, scalar: GraphQLJSON() }],
      },
      playground: {
        subscriptionEndpoint: '/graphql',
      },
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    PubSubModule,
    UserModule,
    AuthModule,
    PictureModule,
    CommentModule,
    S3Module,
    UploadModule,
    FollowModule,
    LikeModule,
    CollectionModule,
    NotificationModule,
    ThoughtModule,
    ThreadModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    UserService,
    LikeResolver,
    CollectionResolver,
    NotificationResolver,
    ThoughtResolver,
    ThoughtService,
  ],
})
export class AppModule {}
