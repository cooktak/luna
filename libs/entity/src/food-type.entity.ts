import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('food_type')
export class FoodTypeEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;
}
