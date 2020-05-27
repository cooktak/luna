import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { SellerEntity } from './seller.entity';
import { VendorEntity } from './vendor.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public info: string;

  @Column()
  public KANProductCategoryCode: string;

  @Column()
  public name: string;

  @Column({ nullable: true })
  public photoLink: string;

  @Column()
  public unit: string;

  @Column()
  public wight: string;

  @ManyToOne(() => SellerEntity, { nullable: false })
  @JoinColumn({ name: 'sellerId' })
  public seller: SellerEntity;

  @ManyToOne(() => VendorEntity, { nullable: false })
  @JoinColumn({ name: 'vendorId' })
  public vendor: VendorEntity;
}