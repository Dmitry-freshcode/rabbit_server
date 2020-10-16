import { ApiProperty } from '@nestjs/swagger';
import {  IsString ,IsArray } from 'class-validator';

export class CreateCategoryStaffDto { 
    @ApiProperty({
        format: 'string[]',
      }) 
    @IsArray()    
    categories: string[];
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()
    staffId: string;  
}
