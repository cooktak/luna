import { IsEmail, IsISO8601, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '@app/entity';

export class SignUpDto {
  @ApiProperty({
    description: '생년월일',
    example: '2019-12-08T05:15:42.000Z',
  })
  @IsISO8601()
  public birthday: string;

  @ApiProperty({ description: '성별 (M or F)' })
  @IsString()
  public gender: GenderEnum;

  @ApiProperty({ description: '닉네임 (max 16자)' })
  @IsString()
  public nickname: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  public password: string;

  @ApiProperty({ description: '사진링크' })
  @IsUrl()
  @IsOptional()
  public photoLink?: string;

  @ApiProperty({ description: '사용자 ID (이메일)' })
  @IsEmail()
  public username: string;
}
