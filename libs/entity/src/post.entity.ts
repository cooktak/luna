import {
  Column, CreateDateColumn, Entity,
  JoinTable, ManyToMany, ManyToOne,
  OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { CookeryEntity } from './cookery.entity';
import { FoodTypeEntity } from './food-type.entity';
import { PostContentEntity } from './post-content.entity';
import { PostIngredientEntity } from './post-ingredient.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createTime: Date;

  @Column()
  public title: string;

  @ManyToOne(
    () => UserEntity,
    (user: UserEntity) => user.posts,
    { nullable: false },
  )
  public user: UserEntity;

  @OneToMany(
    () => PostIngredientEntity,
    (postIngredient: PostIngredientEntity) => postIngredient.post,
  )
  public ingredients: PostIngredientEntity[];

  @OneToMany(
    () => PostContentEntity,
    (postContent: PostContentEntity) => postContent.post,
  )
  public postContents: PostContentEntity[];

  @ManyToMany(() => CookeryEntity)
  @JoinTable({ name: 'post_cookery' })
  public cookeries: CookeryEntity[];

  @ManyToMany(() => FoodTypeEntity)
  @JoinTable({ name: 'post_food_type' })
  public foodTypes: FoodTypeEntity[];

  @ManyToMany(() => ProductEntity)
  @JoinTable({ name: 'post_product' })
  public products: ProductEntity[];
}
