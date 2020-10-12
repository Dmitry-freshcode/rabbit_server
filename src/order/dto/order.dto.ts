import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate } from 'class-validator';

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
        format: 'string',
      }) 
    @IsString()    
    status: string;
    @ApiProperty({
        format: 'Date',
      }) 
    @IsDate()    
    timeStart: Date;
    @ApiProperty({
        format: 'Date',
      }) 
    @IsDate()    
    timeEnd: Date;
}
