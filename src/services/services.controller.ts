import {
  Controller,
  Body,
  Logger,
  Query,
  UseGuards,
  Get,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { ServiceRepository } from './services.repository';
import { CreateServiceDto } from './dto/service.dto';
import { DeleteServiceDto } from './dto/serviceDelete.dto';
import { UpdateServiceDto } from './dto/serviceUpdate.dto';
import { IService } from './interfaces/services.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/role/roles.decorator';

@ApiTags('services')
//@UseGuards(JwtAuthGuard)
@Controller('services')
export class ServicesController {
  private readonly logger = new Logger(ServicesController.name);
  constructor(
    private readonly servicesService: ServicesService,
    private readonly servicesDB: ServiceRepository,
  ) {}

  //@Roles(['admin'])
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Service was created',
    type: CreateServiceDto,
  })
  async addService(@Body() service: CreateServiceDto): Promise<IService> {
    this.logger.log(`service ${service.name} was created`);
    return await this.servicesDB.createService(service);
  }

  @Roles(['admin'])
  @Delete()
  @ApiResponse({
    status: 200,
    description: 'Service was deleted',
    type: DeleteServiceDto,
  })
  async deleteService(@Body('id') id: string): Promise<DeleteServiceDto> {
    this.logger.log(`service ${id} was deleted`);
    return await this.servicesDB.delete(id);
  }

  @Roles(['admin'])
  @Put()
  @ApiResponse({
    status: 200,
    description: 'Service was updated',
    type: UpdateServiceDto,
  })
  async updateService(@Body() service: IService): Promise<UpdateServiceDto> {
    this.logger.log(`service ${service.name} was updated`);
    return await this.servicesDB.updateService(service);
  }
  @Get('byCategory')
  async findByCategory(@Query('id') id: string): Promise<IService[] | undefined> {    
    return await this.servicesDB.findByCategory(id);
  }
  @Get()
  async findService(@Query('id') id: string): Promise<IService | undefined> {
    return await this.servicesDB.find(id);
  }
  @Get('findAll')
  async findAllServices(): Promise<IService[] | undefined> {
    return await this.servicesDB.findAll();
  }
}
