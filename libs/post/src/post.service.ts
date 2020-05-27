import { CookeryEntity, FoodTypeEntity, IngredientEntity, PostContentEntity, PostEntity } from '@app/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  @InjectRepository(CookeryEntity)
  private readonly cookeryRepo: Repository<CookeryEntity>;
  @InjectRepository(IngredientEntity)
  private readonly ingredientRepo: Repository<IngredientEntity>;
  @InjectRepository(FoodTypeEntity)
  private readonly foodTypeRepo: Repository<FoodTypeEntity>;
  @InjectRepository(PostEntity)
  private readonly postRepo: Repository<PostEntity>;
  @InjectRepository(PostContentEntity)
  private readonly postContentRepo: Repository<PostContentEntity>;
}
