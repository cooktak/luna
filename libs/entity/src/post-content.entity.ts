import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostContent {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Post, (post: Post) => post.postContents)
  public post: Post;
}
