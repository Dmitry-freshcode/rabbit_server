import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto { 
    @ApiProperty({
        format: 'string',
      }) 
      @IsString()  
    email: string;
    @ApiProperty({
        format: 'string',
      }) 
    @IsString() 
    password: string;
}