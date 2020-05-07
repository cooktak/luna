import { GenderEnum } from '@app/entity';

export class ReqEdit {
  public birthday?: string;
  public gender?: GenderEnum;
  public newPassword?: string;
  public nickname?: string;
  public password: string;
  public photoLink?: string;
}
