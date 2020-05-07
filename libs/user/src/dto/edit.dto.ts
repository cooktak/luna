import { IsEnum, IsISO8601, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '@app/entity';

export class EditDto {
  @ApiProperty({
    description: '생년월일',
    example: '2019-12-08T05:15:42.000Z',
  })
  @IsISO8601()
  @IsOptional()
  public birthday?: string;

  @ApiProperty({ description: '성별 (M or F)' })
  @IsEnum(GenderEnum)
  @IsOptional()
  public gender?: GenderEnum;

  @ApiProperty({ description: '새 비밀번호' })
  @IsString()
  @IsOptional()
  public newPassword?: string;

  @ApiProperty({ description: '닉네임' })
  @IsString()
  @IsOptional()
  public nickname?: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  @IsOptional()
  public password: string;

  @ApiProperty({ description: '사진링크' })
  @IsUrl()
  @IsOptional()
  public photoLink?: string;
}
