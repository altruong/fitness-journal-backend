import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity() // Type-orm decorator
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  text!: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
