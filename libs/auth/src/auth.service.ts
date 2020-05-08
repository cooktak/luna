import { Inject, Injectable } from '@nestjs/common';
import { Token, User } from '@app/entity';
import { UtilService } from '@app/util';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ResSignIn, UserService } from '@app/user';
import { WithoutPassword } from './user-without-password.type';
import { sign } from 'jsonwebtoken';
import { config } from '@app/config';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;
  @Inject()
  private readonly jwtService: JwtService;
  @Inject()
  private readonly utilService: UtilService;
  @InjectRepository(Token)
  private readonly tokenRepo: Repository<Token>;

  private readonly secret: Buffer;

  constructor() {
    this.secret = config.JWT_SECRET ? Buffer.from(config.JWT_SECRET) : randomBytes(16);
  }

  public async validateUser(username: string, password: string): Promise<WithoutPassword<User>> {
    const user: User = await this.userService.get(username);
    if (user && this.utilService.encode(password) === user.password) {
      Reflect.deleteProperty(user, 'password');
      return user as WithoutPassword<User>;
    } else {
      return null;
    }
  }

  public async login(user: User): Promise<ResSignIn> {
    const foundToken: Token = await this.tokenRepo.findOne({ user });

    const result: ResSignIn = new ResSignIn();

    const payload: WithoutPassword<User> = user as WithoutPassword<User>;
    Reflect.deleteProperty(payload, 'password');

    result.accessToken = sign(payload, this.secret, { expiresIn: '30 min' });
    result.refreshToken = sign(payload, this.secret, { expiresIn: '14 days' });

    if (foundToken) {
      await this.tokenRepo.update(foundToken.id, result);
    } else {
      await this.tokenRepo.insert({ ...result, user });
    }

    return result;
  }
}
