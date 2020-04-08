import { Test, TestingModule } from '@nestjs/testing';
import { PostModule } from './post.module';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '@app/config';
import { entities } from '@app/entity';

describe('PostService', () => {
  let service: PostService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PostModule,
        TypeOrmModule.forRoot({ ...config.ormConfig, entities }),
        TypeOrmModule.forFeature(entities)
      ],
      providers: [PostService],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
