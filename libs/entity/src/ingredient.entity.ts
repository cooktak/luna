import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostIngredient } from './post-ingredient.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(
    () => Ingredient,
    (ingredient: Ingredient) => ingredient.id,
    { nullable: true },
  )
  public parent: Ingredient;

  @OneToMany(
    () => PostIngredient,
    (postIngredient: PostIngredient) => postIngredient.ingredient,
  )
  public posts: PostIngredient[];
}
