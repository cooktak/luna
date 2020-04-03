import { ApiProperty } from '@nestjs/swagger';

export class ResSignIn {
  @ApiProperty()
  public accessToken: string;
  @ApiProperty()
  public refreshToken: string;
}
