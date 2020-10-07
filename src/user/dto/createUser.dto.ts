import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsEmail, IsNumber, IsArray, ArrayNotEmpty, ArrayUnique, Validate } from 'class-validator';

export class CreateUserDto { 
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