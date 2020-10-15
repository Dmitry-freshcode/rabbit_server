import { 
    Controller,    
    Logger,   
    Query,    
    //UseGuards,       
    Get,
    Body,
    Post,
    Delete,
    Patch    
 } from '@nestjs/common';
 import { ApiTags, ApiResponse } from '@nestjs/swagger';
 import { CategoryRepository } from './category.repository';
 import { CreateCategoryDto } from './dto/category.dto';
 import { UpdateCategoryDto } from './dto/categoryUpdate.dto';
 import { DeleteCategoryDto } from './dto/categoryDelete.dto'; 
 import { ICategory } from './interfaces/category.interface'

@ApiTags('category')
@Controller('category')
export class CategoryController {
    private readonly logger = new Logger(CategoryController.name);
    constructor(        
        private readonly categoryDB: CategoryRepository,
      ) {}
      @Post()
      @ApiResponse({ status: 200, description: 'Service was created', type: CreateCategoryDto })
        async addCategory(
          @Body() category: CreateCategoryDto): Promise<ICategory> { 
          this.logger.log(`category ${category.name} was created`);        
          return this.categoryDB.createCategory(category);  
      }
      @Delete()
      @ApiResponse({ status: 200, description: 'Category was deleted', type: DeleteCategoryDto })
      async deleteService(
          @Body('id') id: string): Promise<DeleteCategoryDto> {        
          this.logger.log(`category ${id} was deleted`);      
          return this.categoryDB.delete(id);  
      }
      @Patch()
      @ApiResponse({ status: 200, description: 'Category was updated', type: UpdateCategoryDto })
      async updateService(
          @Body() category: ICategory): Promise<UpdateCategoryDto> { 
          this.logger.log(`category ${category.name} was updated`);        
          return this.categoryDB.updateCategory(category);  
      }
      @Get()
      async findCategory(
          @Query('id') id: string): Promise<ICategory | undefined> {         
          return this.categoryDB.find(id);  
      }
      @Get('findAll')
          async findAllCategories(): Promise<ICategory[] | undefined> {         
          return this.categoryDB.findAll();  
      }

}
