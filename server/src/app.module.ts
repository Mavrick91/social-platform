import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { UserService } from './modules/user/user.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PictureModule } from './modules/picture/picture.module';
import { CommentModule } from './modules/comment/comment.module';
import { S3Module } from './modules/s3/s3.module';
import { UploadModule } from './modules/upload/upload.module';
import { FollowModule } from './modules/follow/follow.module';
import { LikeResolver } from './modules/like/like.resolver';
import { LikeModule } from './modules/like/like.module';
import { CollectionResolver } from './modules/collection/collection.resolver';
import { CollectionModule } from './modules/collection/collection.module';
import { PubSubModule } from './modules/pubsub/PubSub.module';
import { NotificationResolver } from './modules/notification/notification.resolver';
import { NotificationModule } from './modules/notification/notification.module';
import GraphQLJSON from './scalars';
import { PubSub } from 'graphql-subscriptions';
import { ThoughtResolver } from './modules/thought/thought.resolver';
import { ThoughtModule } from './modules/thought/thought.module';
import { ThoughtService } from './modules/thought/thought.service';

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
