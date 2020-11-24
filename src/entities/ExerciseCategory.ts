import { Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class ExerciseCategory {
  @Field(() => Int)
  @PrimaryColumn()
  id!: number;

  @Field()
  @Column()
  name: string;
}
