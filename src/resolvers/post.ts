import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Post } from '../entities/Post';

@Resolver(Post)
export class PostResolver {
  // @FieldResolver(() => String)
  // textSnippet(@Root() root: Post) {
  //   return root.text.slice(0, 50);
  // }

  @Query(() => Post, { nullable: true }) // return a post or null
  post(
    @Arg('id', () => Int) id: number // id is a graphql argument
  ): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    // Builds the query
    const qb = getConnection()
      .getRepository(Post)
      .createQueryBuilder('p')
      .orderBy('p.created_at', 'DESC');
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

  // Update Post Mutation
  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id', () => Int) id: number,
    @Arg('title') title: string,
    @Arg('text') text: string
  ): Promise<Post | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ title: title, text: text })
      .where('id = :id', { id })
      .returning('*') // returns the post that we're updating
      .execute();

    console.log(result);
    //return result;
    return result.raw[0];
  }

  // Delete Post Mutation
  @Mutation(() => Boolean)
  async deletePost(@Arg('id', () => Int) id: number): Promise<boolean> {
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Post)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    // If id is invalid, result array will be empty
    return result.raw[0] ? true : false;
  }
}
