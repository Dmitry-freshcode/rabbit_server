import { ICategory } from './interfaces/category.interface';
import { CreateCategoryDto } from './dto/category.dto';
import { DeleteDto } from '../shared/dto/delete.dto';
import { UpdateDto } from '../shared/dto/update.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel('Category')
    private categoryModel: Model<ICategory>,
  ) {}

  async findAll(): Promise<ICategory[] | undefined> {
    return await this.categoryModel.find({}).exec();
  }
  async createCategory(Category: CreateCategoryDto): Promise<ICategory> {
    const service = new this.categoryModel(Category);
    return await service.save();
  }
  async updateCategory(Category: ICategory): Promise<UpdateDto> {
    return await this.categoryModel.updateOne({ _id: Category._id }, Category);
  }
  async find(id: string): Promise<ICategory | undefined> {
    return await this.categoryModel.findOne({ _id: id }).exec();
  }
  async delete(id: string): Promise<DeleteDto> {
    return await this.categoryModel.deleteOne({ _id: id }).exec();
  }
}
