import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '@app/entity';

export class ResLoad {
  @ApiProperty()
  public birthday: Date;

  @ApiProperty()
  public createTime: Date;

  @ApiProperty()
  public gender: GenderEnum;

  @ApiProperty()
  public nickname: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public userTag: number;
}
