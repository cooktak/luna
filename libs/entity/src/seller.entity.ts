import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('seller')
export class SellerEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(
    () => ProductEntity,
    (product: ProductEntity) => product.seller,
  )
  public products: ProductEntity[];
}
