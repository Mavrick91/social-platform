import { BadRequestException, Inject, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  @Mutation(() => Comment)
  // @UseGuards(GqlAuthGuard)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    try {
      return this.commentService.create(createCommentInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => [Comment], { name: 'commentsByPictureId' })
  @UseGuards(GqlAuthGuard)
  async commentsByPictureId(
    @Args('pictureId', { type: () => Int }) pictureId: number,
  ) {
    try {
      return await this.commentService.commentsByPictureId(pictureId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => [Comment], { name: 'comments' })
  @UseGuards(GqlAuthGuard)
  async findAll() {
    try {
      return await this.commentService.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => Comment, { name: 'comment' })
  @UseGuards(GqlAuthGuard)
  async findOne(@Args('id', { type: () => Int }) id: number) {
    try {
      const comment = await this.commentService.findOne(id);
      if (!comment) {
        throw new BadRequestException(`Comment with ID ${id} not found`);
      }
      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  async updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    try {
      return await this.commentService.update(
        updateCommentInput.id,
        updateCommentInput,
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  async removeComment(@Args('id', { type: () => Int }) id: number) {
    try {
      const comment = await this.commentService.findOne(id);
      if (!comment) {
        throw new BadRequestException(`Comment with ID ${id} not found`);
      }
      return await this.commentService.remove(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
