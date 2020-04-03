import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(() => Ingredient, (ingredient: Ingredient) => ingredient.id)
  public parent: Ingredient[];
}
