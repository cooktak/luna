import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('post_content')
export class PostContentEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @Column()
  public photoLink: string;

  @ManyToOne(
    () => PostEntity,
    (post: PostEntity) => post.postContents,
    { nullable: false },
  )
  public post: PostEntity;
}
