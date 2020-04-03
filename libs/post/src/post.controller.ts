import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';

@Controller('api/post')
@ApiTags('post')
export class PostController {
  @Inject()
  private readonly postService: PostService;
}
