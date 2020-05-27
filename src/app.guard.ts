import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { TokenEntity, UserEntity } from '@app/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilService } from '@app/util';

@Injectable()
export class AppGuard implements CanActivate {
  @InjectRepository(TokenEntity)
  private readonly tokenRepo: Repository<TokenEntity>;

  @InjectRepository(UserEntity)
  private readonly userRepo: Repository<UserEntity>;

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
      const foundUser: UserEntity = await this.userRepo.findOne({ username });
      const foundToken: TokenEntity = await this.tokenRepo.findOne({ user: foundUser });

      if (foundToken.accessToken === token ||
        foundToken.refreshToken === token) {
        return true;
      }
    } catch (e) {
      return false;
    }
  }
}
