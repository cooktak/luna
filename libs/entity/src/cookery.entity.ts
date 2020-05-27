import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cookery')
export class CookeryEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;
}
