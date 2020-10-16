import { 
    Controller,
    Body,
    Logger,   
    Query,    
    //UseGuards,       
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
 import { IService } from './interfaces/services.interface'

@ApiTags('services')
@Controller('services')
export class ServicesController {
    private readonly logger = new Logger(ServicesController.name);
    constructor(
        private readonly servicesService: ServicesService,
        private readonly servicesDB: ServiceRepository,
      ) {}

    @Post()
    @ApiResponse({ status: 200, description: 'Service was created', type: CreateServiceDto })
      async addService(
        @Body() service: CreateServiceDto): Promise<IService> { 
        this.logger.log(`service ${service.name} was created`);        
        return this.servicesDB.createService(service);  
    }
    @Delete()
    @ApiResponse({ status: 200, description: 'Service was deleted', type: DeleteServiceDto })
    async deleteService(
        @Body('id') id: string): Promise<DeleteServiceDto> {        
        this.logger.log(`service ${id} was deleted`);      
        return this.servicesDB.delete(id);  
    }
    @Put()
    @ApiResponse({ status: 200, description: 'Service was updated', type: UpdateServiceDto })
    async updateService(
        @Body() service: IService): Promise<UpdateServiceDto> { 
        this.logger.log(`service ${service.name} was updated`);        
        return this.servicesDB.updateService(service);  
    }
    @Get()
    async findService(
        @Query('id') id: string): Promise<IService | undefined> {         
        return this.servicesDB.find(id);  
    }
    @Get('findAll')
        async findAllServices(): Promise<IService[] | undefined> {         
        return this.servicesDB.findAll();  
    }
}


