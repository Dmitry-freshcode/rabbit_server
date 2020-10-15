import { ICategoryStaff } from './interfaces/categoryStaff.interface';
import { Model } from 'mongoose';
import { CreateCategoryStaffDto } from './dto/categoryStaff.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class CategoryStaffRepository{
    constructor(
        @InjectModel('CategoryStaff')
        private categoryStaffModel: Model<ICategoryStaff>,
      
        ){}

    async findAll():Promise<ICategoryStaff[] | undefined>{                     
        return await this.categoryStaffModel.find({}).exec();
    }
    async createServiceStaff(CategoryStaff:CreateCategoryStaffDto):Promise<ICategoryStaff>{
        const categoryStaff = new this.categoryStaffModel(CategoryStaff);
        return await categoryStaff.save();
    }
    async updateServiceStaff(CategoryStaff:ICategoryStaff):Promise<any>{  
        return await this.categoryStaffModel.updateOne({_id:CategoryStaff._id},CategoryStaff);
    }
    async find(id:string):Promise<ICategoryStaff | undefined>{                     
        return await this.categoryStaffModel.findOne({_id:id}).exec();
    }
    async delete(id:string):Promise<any>{                
        return await this.categoryStaffModel.deleteOne({_id:id}).exec();
    }

}