import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateDto { 
    @ApiProperty({
        format: 'number',
      }) 
    @IsNumber()    
    n: number;
    @ApiProperty({
        format: 'number',
      }) 
    @IsNumber()    
    nModified: number;
    @ApiProperty({
        format: 'number',
      }) 
    @IsNumber()    
    o: number;     
}
