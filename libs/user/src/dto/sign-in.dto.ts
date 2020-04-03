import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 'ljsung0805'
  })
  @IsString()
  public username: string;
  @ApiProperty({
    description: '비밀번호',
    example: 'qlalfqjsgh1'
  })
  @IsString()
  public password: string;
}
