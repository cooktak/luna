import { Cookery } from './cookery.entity';
import { FoodType } from './food-type.entity';
import { Ingredient } from './ingredient.entity';
import { Post } from './post.entity';
import { PostContent } from './post-content.entity';
import { PostIngredient } from './post-ingredient.entity';
import { Product } from './product.entity';
import { Seller } from './seller.entity';
import { Token } from './token.entity';
import { User } from './user.entity';
import { Vendor } from './vendor.entity';

export const entities: Function[] = [
  Cookery, FoodType, Ingredient, Post, PostContent,
  PostIngredient, Product, Seller, Token, User, Vendor,
];
