import { Cookery, FoodType, Ingredient, Post, PostContent } from '@app/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  @InjectRepository(Cookery)
  private readonly cookeryRepo: Repository<Cookery>;
  @InjectRepository(Ingredient)
  private readonly ingredientRepo: Repository<Ingredient>;
  @InjectRepository(FoodType)
  private readonly foodTypeRepo: Repository<FoodType>;
  @InjectRepository(Post)
  private readonly postRepo: Repository<Post>;
  @InjectRepository(PostContent)
  private readonly postContentRepo: Repository<PostContent>;
}
