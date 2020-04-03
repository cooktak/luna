import { IsISO8601, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditDto {
  @ApiProperty({
    description: '생년월일',
    example: '2019-12-08T05:15:42.000Z',
  })
  @IsISO8601()
  @IsOptional()
  public birthday?: string;
  @ApiProperty({ description: '성별 (M or F)' })
  @IsString()
  @IsOptional()
  public gender?: 'M' | 'F';
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
}
