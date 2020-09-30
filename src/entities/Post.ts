import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // type-orm decorator
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;
}
