import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateServiceDto { 
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    name: string;    
    @ApiProperty({
      format: 'string',
    }) 
    @IsString()
    categoryId: string;
}
