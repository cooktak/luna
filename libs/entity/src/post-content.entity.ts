import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostContent {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @Column()
  public photoLink: string;

  @ManyToOne(
    () => Post,
    (post: Post) => post.postContents,
    { nullable: false },
  )
  public post: Post;
}
