import { Cookery } from './cookery.entity';
import { FoodType } from './food-type.entity';
import { Ingredient } from './ingredient.entity';
import { Post } from './post.entity';
import { PostContent } from './post-content.entity';
import { Token } from './token.entity';
import { User } from './user.entity';

export const entities: Function[] = [
  Cookery, FoodType, Ingredient, Post, PostContent, Token, User,
];
