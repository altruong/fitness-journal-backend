import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ExerciseCategory {
  @Field(() => Int)
  @PrimaryColumn()
  id!: number;

  @Field()
  @Column()
  name: string;
}
