import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/category.schema';
import { CategoryRepository } from './category.repository'

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'Category', schema: CategorySchema},          
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryRepository],
  exports:[CategoryRepository]
})
export class CategoryModule {}
