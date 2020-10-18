import {
  Controller,
  Logger,
  Query,
  //UseGuards,
  Get,
  Body,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CategoryRepository } from './category.repository';
import { CategoryStaffRepository } from './categoryStaff.repository';
import { CreateCategoryDto } from './dto/category.dto';
import { CreateCategoryStaffDto } from './dto/categoryStaff.dto';
import { DeleteDto } from '../shared/dto/delete.dto';
import { UpdateDto } from '../shared/dto/update.dto';
import { ICategory } from './interfaces/category.interface';
import { ICategoryStaff } from './interfaces/categoryStaff.interface';
import { SuccessDto } from '../shared/dto/success.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);
  constructor(
    private readonly categoryDB: CategoryRepository,
    private readonly categoryStaffDB: CategoryStaffRepository,
  ) {}
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Service was created',
    type: CreateCategoryDto,
  })
  async addCategory(@Body() category: CreateCategoryDto): Promise<ICategory> {
    this.logger.log(`category ${category.name} was created`);
    return this.categoryDB.createCategory(category);
  }
  @Post('staffCategory')
  @ApiResponse({
    status: 200,
    description: 'Service was created',
    type: SuccessDto,
  })
  async addStaffCategory(
    @Body() data: CreateCategoryStaffDto,
  ): Promise<SuccessDto> {
    this.logger.log(`category for staff: ${data.staffId} was created`);
    return this.categoryStaffDB.createCategoryStaff(data);
  }
  @Get('staffCategory')
  @ApiResponse({
    status: 200,
    description: 'Service was created',
    type: [CreateCategoryStaffDto],
  })
  async getStaffCategory(@Query('id') id: string): Promise<ICategoryStaff[]> {
    return this.categoryStaffDB.findStaffCategories(id);
  }
  @Put('staffCategory')
  @ApiResponse({
    status: 200,
    description: 'Service was created',
    type: CreateCategoryDto,
  })
  async updateStaffCategory(@Body() data: ICategoryStaff): Promise<UpdateDto> {
    this.logger.log(`category for staff: ${data.staffId} was updated`);
    return this.categoryStaffDB.updateCategoryStaff(data);
  }
  @Delete()
  @ApiResponse({
    status: 200,
    description: 'Category was deleted',
    type: DeleteDto,
  })
  async deleteService(@Body('id') id: string): Promise<DeleteDto> {
    this.logger.log(`category ${id} was deleted`);
    return this.categoryDB.delete(id);
  }
  @Put()
  @ApiResponse({
    status: 200,
    description: 'Category was updated',
    type: UpdateDto,
  })
  async updateService(@Body() category: ICategory): Promise<UpdateDto> {
    this.logger.log(`category ${category.name} was updated`);
    return this.categoryDB.updateCategory(category);
  }
  @Get()
  async findCategory(@Query('id') id: string): Promise<ICategory | undefined> {
    return this.categoryDB.find(id);
  }
  @Get('findAll')
  async findAllCategories(): Promise<ICategory[] | undefined> {
    return this.categoryDB.findAll();
  }
}
