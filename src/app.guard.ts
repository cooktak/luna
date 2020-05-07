import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Token, User } from '@app/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilService } from '@app/util';

@Injectable()
export class AppGuard implements CanActivate {
  @InjectRepository(Token)
  private readonly tokenRepo: Repository<Token>;

  @InjectRepository(User)
  private readonly userRepo: Repository<User>;

  @Inject()
  private readonly utilService: UtilService;

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const token: string = this.utilService.getTokenBody(context.switchToHttp().getRequest());
    if (!token) {
      return true;
    }

    const username: string = this.utilService.getUsernameByToken(token);
    if (null === username) {
      return false;
    }

    try {
      const foundUser: User = await this.userRepo.findOne({ username });
      const foundToken: Token = await this.tokenRepo.findOne({ user: foundUser });

      if (foundToken.accessToken === token ||
        foundToken.refreshToken === token) {
        return true;
      }
    } catch (e) {
      return false;
    }
  }
}
