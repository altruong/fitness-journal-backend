import { Post } from '../entities/Post';
import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver(Post)
export class PostResolver {
  @Mutation(() => Post)
  post(@Arg('title') title: string, @Arg('text') text: string): Promise<Post> {
    return Post.create({ title, text }).save();
  }
}
