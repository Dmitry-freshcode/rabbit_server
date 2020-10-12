import { 
    Controller,    
    Logger,   
    Query,    
    //UseGuards,       
    Get,     
 } from '@nestjs/common';
 //import { CategoryService } from './category.service';
 import { CategoryRepository } from './category.repository';
 //import { CreateCategoryDto } from './dto/category.dto';
 import { ICategory } from './interfaces/category.interface'

@Controller('category')
export class CategoryController {
    private readonly logger = new Logger(CategoryController.name);
    constructor(        
        private readonly categoryDB: CategoryRepository,
      ) {}
      @Get('find')
      async findCategory(
          @Query('id') id: string): Promise<ICategory | undefined> {         
          return this.categoryDB.find(id);  
      }
      @Get('findAll')
          async findAllCategories(): Promise<ICategory[] | undefined> {         
          return this.categoryDB.findAll();  
      }

}
