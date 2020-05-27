import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GenderEnum } from './enum';
import { PostEntity } from './post.entity';

@Entity('user')
export class UserEntity {
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

  @OneToMany(() => PostEntity, (post: PostEntity) => post.user)
  public posts: PostEntity[];
}
