import { Post } from '../entities/Post';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';

@Resolver(Post)
export class PostResolver {
  @Query(() => Post, { nullable: true }) // return a post or null
  post(
    @Arg('id') id: string // id is a graphql argument
  ): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    // Builds the query
    const qb = getConnection().getRepository(Post).createQueryBuilder('p');
    // Request the resource
    const posts = await qb.getMany();
    return posts;
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('title') title: string,
    @Arg('text') text: string
  ): Promise<Post> {
    return Post.create({ title, text }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id') id: string,
    @Arg('title') title: string,
    @Arg('text') text: string
  ): Promise<Post | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ title, text })
      .where('id = :id', { id })
      .returning('*') // returns the post that we're updating
      .execute();

    console.log(result);
    //return result;
    return result.raw[0];
  }

  //@Mutation (() => Boolean)
}
