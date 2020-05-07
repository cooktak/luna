import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public accessToken: string;

  @Column()
  public refreshToken: string;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  public user: User;

}
