import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Post } from './post.entity';

@Entity()
export class PostIngredient {
  @PrimaryColumn()
  public ingredientId: number;

  @PrimaryColumn()
  public postId: number;

  @Column()
  public amount: number;

  @Column()
  public unit: string;

  @ManyToOne(() => Ingredient, (ingredient: Ingredient) => ingredient.posts)
  @JoinColumn({ name: 'ingredientId' })
  public ingredient: Ingredient;

  @ManyToOne(() => Post, (post: Post) => post.ingredients)
  @JoinColumn({ name: 'postId' })
  public post: Post;
}
