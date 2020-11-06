import {
  Controller,
  Logger,
  Query,
  UseGuards,
  Get,
  Body,
  Post,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  Req,
  HttpException,
  HttpStatus,
  Res,
  Param,
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
import { Roles } from '../auth/role/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { CategoryStaffService } from './categoryStaff.service';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);
  constructor(
    private readonly categoryDB: CategoryRepository,
    private readonly categoryStaffDB: CategoryStaffRepository,
    private readonly categoryStaffService: CategoryStaffService,
  ) {}

  @Post('staffCategory')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Service was created',
    type: SuccessDto,
  })
  async addStaffCategory(
    @Body() data: CreateCategoryStaffDto,
  ): Promise<SuccessDto> {
    this.logger.log(`category for staff: ${data.staffId} was created`);
    return this.categoryStaffService.addStaffCategory(data);
    //return this.categoryStaffDB.createCategoryStaff(data);
  }

  @Get('staffCategory')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Service was created',
    type: [CreateCategoryStaffDto],
  })
  async getStaffCategory(@Query('id') id: string): Promise<ICategoryStaff[]> {
    return this.categoryStaffDB.findStaffCategories(id);
  }

  @Put('staffCategory')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Service was created',
    type: SuccessDto,
  })
  async updateUserStaffCategory(
    @Body() data: CreateCategoryStaffDto,
  ): Promise<SuccessDto> {
    this.logger.log(`category for staff: ${data.staffId} was updated`);   
    return this.categoryStaffService.updateStaffCategory(data);
    //return this.categoryStaffDB.createCategoryStaff(data);
  }

  @Roles(['admin'])
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Category was created',
    type: CreateCategoryDto,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/uploads/category',
        filename: (req, file, cb) => {
          const filename: string = Date.now().toString();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype == 'image/png' ||
          file.mimetype == 'image/jpg' ||
          file.mimetype == 'image/jpeg'
        ) {
          cb(null, true);
        } else {
          req.fileValidationError = 'goes wrong on the mimetype';
          cb(null, false);
        }
      },
    }),
  )
  async addCategory(
    @UploadedFile() file,
    @Body() category: CreateCategoryDto,
    @Req() req,
  ): Promise<ICategory> {
    if (req.fileValidationError) {
      throw new HttpException(
        'Only .png, .jpg and .jpeg format allowed!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const src = `${process.env.APP_URL}/category/image/${file.filename}`;
    this.logger.log(`category ${category.name} was created`);
    return await this.categoryDB.createCategory({ ...category, imageSrc: src });
  }

  @Get('image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res) {
    return res.sendFile(
      path.join(process.cwd(), 'src/uploads/category/' + imagename),
    );
  }

  @Roles(['admin'])
  @Put('staffCategory')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Category was updated',
    type: CreateCategoryDto,
  })
  async updateStaffCategory(@Body() data: ICategoryStaff): Promise<UpdateDto> {
    this.logger.log(`category for staff: ${data.staffId} was updated`);
    return this.categoryStaffDB.updateCategoryStaff(data);
  }

  @Roles(['admin'])
  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Category was deleted',
    type: DeleteDto,
  })
  async deleteService(@Body('id') id: string): Promise<DeleteDto> {
    this.logger.log(`category ${id} was deleted`);
    return this.categoryDB.delete(id);
  }

  @Roles(['admin'])
  @Put()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async findCategory(@Query('id') id: string): Promise<ICategory | undefined> {
    return this.categoryDB.find(id);
  }

  @Get('findAll')
  @UseGuards(JwtAuthGuard)
  async findAllCategories(): Promise<ICategory[] | undefined> {
    return this.categoryDB.findAll();
  }
}
