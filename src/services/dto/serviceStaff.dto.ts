import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateServiceStaffDto { 
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    serviceId: string;
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()
    staffId: string;  
}
