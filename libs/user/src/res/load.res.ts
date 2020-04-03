import { ApiProperty } from '@nestjs/swagger';

export class ResLoad {
  @ApiProperty()
  public birthday: Date;

  @ApiProperty()
  public createTime: Date;

  @ApiProperty()
  public gender: 'M' | 'F';

  @ApiProperty()
  public nickname: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public userTag: number;
}
