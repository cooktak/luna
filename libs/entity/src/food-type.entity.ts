import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FoodType {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;
}
