import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Program extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => User, (user) => (user as any).program)
  user: User;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  start_date: Date;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
