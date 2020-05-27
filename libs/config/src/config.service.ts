import { IsEnum, IsNumberString, IsOptional, IsString, ValidationError, validateSync } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { NodeEnv } from './node-env.enum';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';
import { parse } from 'dotenv';
import { randomBytes } from 'crypto';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export type Config = Record<string, string>;

@Injectable()
export class ConfigService {
  @IsString()
  public readonly ENCRYPTION: string = 'HS256';

  @IsString() @IsOptional()
  public readonly HOST?: string;

  @IsString() @IsOptional()
  public readonly JWT_SECRET: string = randomBytes(16).toString();

  @IsString() @IsOptional()
  public readonly DB_TYPE: 'mysql' | 'mariadb' = 'mysql';

  @IsEnum(NodeEnv)
  public readonly NODE_ENV: NodeEnv;

  @IsString()
  public readonly DB_URL: string;

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
      database: /\/.*$/i.exec(this.DB_URL)[0],
      synchronize: true,
      type: this.DB_TYPE,
      url: this.DB_URL,
    };
  }
}

export const config: ConfigService = new ConfigService(resolve(process.cwd(), '.env'));
