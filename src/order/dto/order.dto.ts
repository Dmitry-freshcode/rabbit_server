import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class CreateOrderDto { 
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    userId: string;
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    staffId: string;
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    categoryId: string;  
    @ApiProperty({
        format: 'Date',
      }) 
    @IsDateString()    
    timeStart: Date;
    @ApiProperty({
        format: 'Date',
      }) 
    @IsDateString()    
    timeEnd: Date;
    @ApiProperty({
      format: 'array',
    }) 
    @IsString()    
    services: string[];
    
}
