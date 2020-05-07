import {
  Column, CreateDateColumn, Entity,
  JoinTable, ManyToMany, ManyToOne,
  OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Cookery } from './cookery.entity';
import { FoodType } from './food-type.entity';
import { PostContent } from './post-content.entity';
import { PostIngredient } from './post-ingredient.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createTime: Date;

  @Column()
  public title: string;

  @ManyToOne(
    () => User,
    (user: User) => user.posts,
    { nullable: false },
  )
  public user: User;

  @OneToMany(
    () => PostIngredient,
    (postIngredient: PostIngredient) => postIngredient.post,
  )
  public ingredients: PostIngredient[];

  @OneToMany(
    () => PostContent,
    (postContent: PostContent) => postContent.post,
  )
  public postContents: PostContent[];

  @ManyToMany(() => Cookery)
  @JoinTable({ name: 'post_cookery' })
  public cookeries: Cookery[];

  @ManyToMany(() => FoodType)
  @JoinTable({ name: 'post_food_type' })
  public foodTypes: FoodType[];

  @ManyToMany(() => Product)
  @JoinTable({ name: 'post_product' })
  public products: Product[];
}
