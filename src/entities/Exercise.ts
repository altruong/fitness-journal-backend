import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType() // Type-graphql decorator
@Entity() // Type-orm decorator
export class Exercise {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', default: null })
  type: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', default: null })
  description: string | null;
}
