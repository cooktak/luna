import { GenderEnum } from '@app/entity';

export class ReqSignUp {
  public readonly birthday: string;
  public readonly gender: GenderEnum;
  public readonly nickname: string;
  public readonly password: string;
  public readonly username: string;
}
