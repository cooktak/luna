import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Seller } from './seller.entity';
import { Vendor } from './vendor.entity';

@Entity()
export class Product {
  @PrimaryColumn()
  public id: string;

  @Column()
  public info: string;

  @Column()
  public kanProductCategoryCode: string;

  @Column()
  public name: string;

  @Column({ nullable: true })
  public photoLink: string;

  @Column()
  public unit: string;

  @Column()
  public wight: string;

  @ManyToOne(() => Seller, { nullable: false })
  @JoinColumn({ name: 'sellerId' })
  public seller: Seller;

  @ManyToOne(() => Vendor, { nullable: false })
  @JoinColumn({ name: 'vendorId' })
  public vendor: Vendor;
}