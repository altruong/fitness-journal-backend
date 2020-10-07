import { Post } from '../entities/Post';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

@Resolver(Post)
export class PostResolver {
  @Query(() => Post, { nullable: true }) // return a post or null
  post(
    @Arg('id') id: string // id is a graphql argument
  ): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('title') title: string,
    @Arg('text') text: string
  ): Promise<Post> {
    return Post.create({ title, text }).save();
  }
}
