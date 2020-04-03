import { ConfigModule } from '@app/config';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user';
import { entities } from '@app/entity';

@Module({
  controllers: [PostController],
  exports: [PostService],
  imports: [
    ConfigModule, UserModule,
    TypeOrmModule.forFeature(entities),
  ],
  providers: [PostService],
})
export class PostModule {
}
