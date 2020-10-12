import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOrderServiceDto { 
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    serviceId: string;
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    orderId: string;    
}
