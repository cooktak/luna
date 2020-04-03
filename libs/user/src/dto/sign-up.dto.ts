import { IsEmail, IsISO8601, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    description: '생년월일',
    example: '2019-12-08T05:15:42.000Z',
  })
  @IsISO8601()
  public birthday: string;
  @ApiProperty({ description: '성별 (M or F)' })
  @IsString()
  public gender: 'M' | 'F';
  @ApiProperty({ description: '닉네임 (max 16자)' })
  @IsString()
  public nickname: string;
  @ApiProperty({ description: '비밀번호' })
  @IsString()
  public password: string;
  @ApiProperty({ description: '사용자 ID (이메일)' })
  @IsEmail()
  public username: string;
}
