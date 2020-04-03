import {
  Column, CreateDateColumn, Entity,
  JoinTable, ManyToMany, ManyToOne,
  OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Cookery } from './cookery.entity';
import { FoodType } from './food-type.entity';
import { Ingredient } from './ingredient.entity';
import { PostContent } from './post-content.entity';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @CreateDateColumn()
  public createTime: Date;

  @ManyToOne(() => User, (user: User) => user.posts)
  public user: User;

  @OneToMany(() => PostContent,
    (postContent: PostContent) => postContent.post)
  public postContents: PostContent[];

  @ManyToMany(() => Cookery)
  @JoinTable({ name: 'post_cookery'})
  public cookeries: Cookery[];

  @ManyToMany(() => FoodType)
  @JoinTable({ name: 'post_food_type'})
  public foodTypes: FoodType[];

  @ManyToMany(() => Ingredient)
  @JoinTable({ name: 'post_ingredient'})
  public ingredients: Ingredient[];
}
