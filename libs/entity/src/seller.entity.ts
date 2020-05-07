import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(
    () => Product,
    (product: Product) => product.seller,
  )
  public products: Product[];
}
