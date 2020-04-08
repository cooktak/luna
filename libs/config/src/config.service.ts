import { IsEnum, IsNumberString, IsOptional, IsString, validateSync } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { NodeEnv } from './node-env.enum';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ValidationError } from 'class-validator';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export type Config = Record<string, string>;

@Injectable()
export class ConfigService {
  @IsString()
  public readonly ENCRYPTION: string;

  @IsString() @IsOptional()
  public readonly HOST?: string;

  @IsString() @IsOptional()
  public readonly JWT_SECRET?: string;

  @IsString()
  public readonly MYSQL_DB: string;

  @IsString()
  public readonly MYSQL_HOST: string;

  @IsString()
  public readonly MYSQL_PASS: string;

  @IsNumberString() @IsOptional()
  public readonly MYSQL_PORT: string = '3306';

  @IsString() @IsOptional()
  public readonly MYSQL_TYPE: 'mysql' | 'mariadb' = 'mysql';

  @IsString()
  public readonly MYSQL_USER: string;

  @IsEnum(NodeEnv)
  public readonly NODE_ENV: NodeEnv;

  @IsOptional() @IsNumberString()
  public readonly PORT?: string;

  public readonly ormConfig: TypeOrmModuleOptions;

  public constructor(filePath?: string, customConfig?: Config) {
    Object.assign(this, {
      NODE_ENV: NodeEnv.development,
      ...process.env,
      ...filePath && fileExistsSync(filePath) && parse(readFileSync(filePath)),
      ...customConfig,
    });

    const errors: ValidationError[] = validateSync(this);
    if (errors.length > 0) {
      throw new Error(errors[0].toString());
    }

    this.ormConfig = {
      database: this.MYSQL_DB,
      host: this.MYSQL_HOST,
      password: this.MYSQL_PASS,
      port: parseInt(this.MYSQL_PORT, 10),
      synchronize: true,
      type: this.MYSQL_TYPE,
      username: this.MYSQL_USER,
    };
  }
}

export const config: ConfigService = new ConfigService(resolve(process.cwd(), '.env'));
