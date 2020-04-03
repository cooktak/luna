import { Module } from '@nestjs/common';
import { PostModule } from '@app/post';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user';
import { config } from '@app/config';
import { entities } from '@app/entity';

@Module({
  imports: [
    UserModule, PostModule,
    TypeOrmModule.forRoot({ ...config.ormConfig, entities }),
  ],
})
export class AppModule {
}
