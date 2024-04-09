import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ThoughtService } from './thought.service';
import { Thought } from './entities/thought.entity';
import { CreateThoughtInput } from './dto/create-thought.input';
import { UpdateThoughtInput } from './dto/update-thought.input';

@Resolver(() => Thought)
export class ThoughtResolver {
  constructor(private readonly thoughtService: ThoughtService) {}

  @Query(() => [Thought])
  async thoughts(@Args('userId') userId: number) {
    return this.thoughtService.findAll(userId);
  }

  @Mutation(() => Thought)
  async createThought(
    @Args('createThoughtInput') createThoughtInput: CreateThoughtInput,
  ) {
    return this.thoughtService.create(createThoughtInput);
  }

  @Mutation(() => Thought)
  async updateThought(
    @Args('updateThoughtInput') updateThoughtInput: UpdateThoughtInput,
  ) {
    return this.thoughtService.update(updateThoughtInput);
  }

  @Mutation(() => Thought)
  async deleteThought(@Args('id') id: number) {
    return this.thoughtService.delete(id);
  }
}
