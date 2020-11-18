import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Activity extends BaseEntity {
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
  order: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', default: null })
  notes: string | null;
}
