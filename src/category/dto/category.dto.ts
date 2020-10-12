import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto { 
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    name: string;
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()
    imageSrc: string;  
}
