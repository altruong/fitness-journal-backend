import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  reps: number;

  @Field()
  @Column()
  sets: number;

  @Field()
  @Column()
  intensity: number;

  @Field()
  @Column()
  description: number;

  @Field()
  @Column()
  type: string | null;

  @Field()
  @Column()
  order: string;

  @Field()
  @Column()
  notes: string | null;
}
