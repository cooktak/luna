import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: '사용자 ID' })
  @IsString()
  public username: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  public password: string;
}
