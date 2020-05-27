import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('token')
export class TokenEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public accessToken: string;

  @Column()
  public refreshToken: string;

  @OneToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'userId' })
  public user: UserEntity;

}
