import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('vendor')
export class VendorEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(
    () => ProductEntity,
    (product: ProductEntity) => product.vendor,
  )
  public products: ProductEntity[];
}
