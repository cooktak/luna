import { UtilModule, UtilService } from '@app/util';
import { APP_GUARD } from '@nestjs/core';
import { AppGuard } from './app.guard';
import { Module } from '@nestjs/common';
import { PostModule } from '@app/post';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user';
import { config } from '@app/config';
import { entities } from '@app/entity';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRoot({ ...config.ormConfig, entities }),
    TypeOrmModule.forFeature(entities),
    UserModule, UtilModule,
  ],
  providers: [{
    inject: [UtilService],
    provide: APP_GUARD,
    useClass: AppGuard,
  }],
})
export class AppModule {
}
