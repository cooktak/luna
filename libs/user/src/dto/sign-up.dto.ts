import { IsEmail, IsEnum, IsISO8601, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '@app/entity';

export class SignUpDto {
  @ApiProperty({
    description: '생년월일',
    example: new Date().toISOString(),
  })
  @IsISO8601()
  public birthday: string;

  @ApiProperty({
    default: GenderEnum.private,
    description: '성별 (M or F)',
    enum: GenderEnum,
  })
  @IsEnum(GenderEnum)
  public gender: GenderEnum;

  @ApiProperty({ description: '닉네임 (max 16자)' })
  @IsString()
  @MaxLength(16)
  public nickname: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  public password: string;

  @ApiProperty({ description: '사진링크' })
  @IsUrl()
  @IsOptional()
  public photoLink?: string;

  @ApiProperty({
    description: '사용자 ID (이메일)',
    example: 'user@domain.com',
  })
  @IsEmail()
  public username: string;
}
