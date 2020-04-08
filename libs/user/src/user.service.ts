import { ConflictException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ReqSignIn, ReqSignUp } from './req';
import { ResLoad, ResRefresh, ResSignIn } from './res';
import { Token, User } from '@app/entity';
import { TokenTypeEnum, UtilService } from '@app/util';
import { EditDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  @InjectRepository(Token)
  private readonly tokenRepo: Repository<Token>;

  @InjectRepository(User)
  private readonly userRepo: Repository<User>;

  @Inject()
  private readonly utilService: UtilService;

  public async edit(token: string, payload: EditDto): Promise<void> {
    const username: string = this.utilService.getUsernameByToken(token);
    const foundUser: User = await this.userRepo.findOne({ username });
    if (!foundUser || this.utilService.encode(payload.password) !== foundUser.password) {
      throw new ForbiddenException();
    }
    if (payload.newPassword) {
      payload.password = this.utilService.encode(payload.newPassword);
      Reflect.deleteProperty(payload, 'newPassword');
    } else {
      Reflect.deleteProperty(payload, 'password');
    }
    await this.userRepo.update(foundUser.id, payload);
  }

  public async leave(token: string): Promise<void> {
    const username: string = this.utilService.getUsernameByToken(token);
    const foundUser: User = await this.userRepo.findOne({ username });
    const foundToken: Token = await this.tokenRepo.findOne({ user: foundUser });
    if (foundToken) {
      await this.tokenRepo.remove(foundToken);
    }
    await this.userRepo.remove(foundUser);
  }

  public async load(token: string): Promise<ResLoad> {
    const username: string = this.utilService.getUsernameByToken(token);
    const foundUser: User = await this.userRepo.findOne({ username });
    if (!foundUser) {
      throw new ForbiddenException();
    }

    for (const e of ['id', 'password']) {
      Reflect.deleteProperty(foundUser, e);
    }
    return foundUser;
  }

  public async refresh(token: string): Promise<ResRefresh> {
    const username: string = this.utilService.getUsernameByToken(token);
    const result: ResRefresh = {
      accessToken: this.utilService.createToken(username, TokenTypeEnum.access),
    };
    await this.tokenRepo.update(foundToken.id, result);
    return result;
  }

  public async signIn(payload: ReqSignIn): Promise<ResSignIn> {
    const foundUser: User = await this.userRepo.findOne({ username: payload.username });
    if (!foundUser || this.utilService.encode(payload.password) !== foundUser.password) {
      throw new ForbiddenException();
    }

    const foundToken: Token = await this.tokenRepo.findOne({ user: foundUser });

    const result: ResSignIn = { accessToken: null, refreshToken: null };

    if (foundToken) {
      if (!this.utilService.getUsernameByToken(foundToken.refreshToken)) {
        result.accessToken = this.utilService.createToken(payload.username, TokenTypeEnum.access);
        result.refreshToken = this.utilService.createToken(payload.username, TokenTypeEnum.refresh);
      } else if (!this.utilService.getUsernameByToken(foundToken.accessToken)) {
        result.accessToken = this.utilService.createToken(payload.username, TokenTypeEnum.access);
        result.refreshToken = foundToken.refreshToken;
      } else {
        result.accessToken = foundToken.accessToken;
        result.refreshToken = foundToken.refreshToken;
      }

      if (foundToken.accessToken !== result.accessToken) {
        await this.tokenRepo.update(foundToken.id, result);
      }
    } else {
      result.accessToken = this.utilService.createToken(payload.username, TokenTypeEnum.access);
      result.refreshToken = this.utilService.createToken(payload.username, TokenTypeEnum.refresh);
      await this.tokenRepo.insert({ ...result, user: foundUser });
    }

    return result;
  }

  public async signOut(token: string): Promise<void> {
    const foundToken: Token = await this.tokenRepo.findOne({ accessToken: token });
    await this.tokenRepo.delete(foundToken);
  }

  public async signUp(payload: ReqSignUp): Promise<void> {
    const foundUser: User = await this.userRepo.findOne({ username: payload.username });
    if (foundUser) {
      throw new ConflictException();
    }

    const foundUsers: User[] = await this.userRepo.find({ nickname: payload.nickname });
    const user: User = new User();

    Object.assign(user, {
      ...payload,
      birthday: new Date(payload.birthday),
      password: this.utilService.encode(payload.password),
      userTag: foundUsers ? foundUsers.length : 0,
    });
    await this.userRepo.insert(user);
  }
}
