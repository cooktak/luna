import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GenderEnum } from './enum';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public birthday: Date;

  @CreateDateColumn()
  public createTime: Date;

  @Column({ enum: GenderEnum, type: 'enum' })
  public gender: GenderEnum;

  @Column({ length: 16 })
  public nickname: string;

  @Column()
  public password: string;

  @Column({ nullable: true })
  public photoLink: string;

  @Column()
  public username: string;

  @Column()
  public userTag: number;

  @OneToMany(() => Post, (post: Post) => post.user)
  public posts: Post[];
}
