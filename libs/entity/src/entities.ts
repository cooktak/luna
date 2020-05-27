import { CookeryEntity } from './cookery.entity';
import { FoodTypeEntity } from './food-type.entity';
import { IngredientEntity } from './ingredient.entity';
import { PostContentEntity } from './post-content.entity';
import { PostEntity } from './post.entity';
import { PostIngredientEntity } from './post-ingredient.entity';
import { ProductEntity } from './product.entity';
import { SellerEntity } from './seller.entity';
import { TokenEntity } from './token.entity';
import { UserEntity } from './user.entity';
import { VendorEntity } from './vendor.entity';

export const entities: Function[] = [
  CookeryEntity, FoodTypeEntity, IngredientEntity, PostEntity, PostContentEntity,
  PostIngredientEntity, ProductEntity, SellerEntity, TokenEntity, UserEntity, VendorEntity,
];
