import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UtilModule } from '@app/util';
import { entities } from '@app/entity';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature(entities), UtilModule],
  providers: [UserService],
})
export class UserModule {
}
