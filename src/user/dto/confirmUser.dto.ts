import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ConfirmUserDto { 
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    token: string; 
}