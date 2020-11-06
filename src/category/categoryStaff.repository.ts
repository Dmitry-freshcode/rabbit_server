import { ICategoryStaff } from './interfaces/categoryStaff.interface';
import { Model, Types } from 'mongoose';
import { CreateCategoryStaffDto } from './dto/categoryStaff.dto';
import { DeleteDto } from '../shared/dto/delete.dto';
import { UpdateDto } from '../shared/dto/update.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {SuccessDto} from '../shared/dto/success.dto';


@Injectable()
export class CategoryStaffRepository{
    constructor(
        @InjectModel('CategoryStaff')
        private categoryStaffModel: Model<ICategoryStaff>,
      
        ){}

    async findAll():Promise<ICategoryStaff[] | undefined>{                     
        return await this.categoryStaffModel.find({}).exec();
    }
   
    async updateCategoryStaff(CategoryStaff:ICategoryStaff):Promise<UpdateDto>{  
        return await this.categoryStaffModel.updateOne({_id:CategoryStaff._id},CategoryStaff);
    }
    async find(id:string):Promise<ICategoryStaff | undefined>{                     
        return await this.categoryStaffModel.findOne({_id:id}).exec();
    }
    async delete(id:string):Promise<DeleteDto>{                
        return await this.categoryStaffModel.deleteOne({_id:id}).exec();
    }
    async deleteAllStaffCategory(id:string):Promise<DeleteDto>{                
        return await this.categoryStaffModel.deleteMany({staffId:id}).exec();
    }

    async findStaffCategory(id:string):Promise<any | undefined>{                     
        return await this.categoryStaffModel.findOne({_id:id}).exec();
    }

    async createCategoryStaff(data:ICategoryStaff[]):Promise<any>{
        const add = await this.categoryStaffModel.create( data);
        // data.categories.forEach(async (category)=>{
        //     const categoryStaff = new this.categoryStaffModel({categoryId:category,staffId:data.staffId});
        //     await categoryStaff.save();            
        // }) 
        return add ;    
    }
    

    async findStaffCategories(id:string):Promise<ICategoryStaff[] | undefined>{
        return await this.categoryStaffModel.find({staffId:id});
    }

}