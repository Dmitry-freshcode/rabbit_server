import {
    Injectable,
    HttpException,
    HttpStatus,
    Inject,
    Logger,
    forwardRef,
  } from '@nestjs/common'; 
import { CategoryStaffRepository } from './categoryStaff.repository';
import { CreateCategoryStaffDto } from './dto/categoryStaff.dto';
  
  @Injectable()
  export class CategoryStaffService {
    private readonly logger = new Logger(CategoryStaffService.name);
    constructor(  
        private readonly categoryStaffDB: CategoryStaffRepository  
    ) {}

    async addStaffCategory(data:CreateCategoryStaffDto):Promise<any>{
        let create =[];
        data.categories.forEach((category)=>{
            create = [...create, { categoryId: category, staffId:data.staffId}]                 
        })   
        const dbRes = await this.categoryStaffDB.createCategoryStaff(create)     
        return {category:dbRes};
    }

    async updateStaffCategory(data:CreateCategoryStaffDto):Promise<any>{    
      const dbDel = await this.categoryStaffDB.deleteAllStaffCategory(data.staffId) 
      return await this.addStaffCategory(data)  
  }


  }
  