import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public birthday: Date;

  @CreateDateColumn()
  public createTime: Date;

  @Column()
  public gender: 'M' | 'F';

  @Column({ length: 16 })
  public nickname: string;

  @Column()
  public password: string;

  @Column()
  public username: string;

  @Column()
  public userTag: number;

  @OneToMany(() => Post, (post: Post) => post.user)
  public posts: Post[];
}
