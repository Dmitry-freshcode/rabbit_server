import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/category.schema';
import { CategoryStaffSchema } from './schemas/categoryStaff.schema';
import { CategoryRepository } from './category.repository';
import { CategoryStaffRepository } from './categoryStaff.repository';
import { CategoryStaffService } from './categoryStaff.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'Category', schema: CategorySchema},
      {name: 'CategoryStaff', schema: CategoryStaffSchema},          
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryRepository,CategoryStaffRepository,CategoryStaffService],
  exports:[CategoryRepository,CategoryStaffRepository]
})
export class CategoryModule {}
