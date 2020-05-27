import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IngredientEntity } from './ingredient.entity';
import { PostEntity } from './post.entity';

@Entity('post_ingredient')
export class PostIngredientEntity {
  @PrimaryColumn()
  public ingredientId: number;

  @PrimaryColumn()
  public postId: number;

  @Column()
  public amount: number;

  @Column()
  public unit: string;

  @ManyToOne(() => IngredientEntity, (ingredient: IngredientEntity) => ingredient.posts)
  @JoinColumn({ name: 'ingredientId' })
  public ingredient: IngredientEntity;

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.ingredients)
  @JoinColumn({ name: 'postId' })
  public post: PostEntity;
}
