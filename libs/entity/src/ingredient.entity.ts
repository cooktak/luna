import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostIngredientEntity } from './post-ingredient.entity';

@Entity('ingredient')
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(
    () => IngredientEntity,
    (ingredient: IngredientEntity) => ingredient.id,
    { nullable: true },
  )
  public parent: IngredientEntity;

  @OneToMany(
    () => PostIngredientEntity,
    (postIngredient: PostIngredientEntity) => postIngredient.ingredient,
  )
  public posts: PostIngredientEntity[];
}
