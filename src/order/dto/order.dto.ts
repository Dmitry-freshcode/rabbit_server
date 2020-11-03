import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsArray, IsNumber } from 'class-validator';

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
    @IsNumber()    
    timeStart: number;
    @ApiProperty({
        format: 'Date',
      }) 
    @IsNumber()    
    timeEnd: number;
    @ApiProperty({
      format: 'array',
    }) 
    @IsArray()    
    services: string[];
    
}
