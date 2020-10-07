import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsEmail, IsNumber, IsArray, ArrayNotEmpty, ArrayUnique, Validate } from 'class-validator';

export class CreateUserProfileDto { 
    @ApiProperty({
      format: 'string',
    })
    @IsString()
    @IsNotEmpty()
    lastName: string;
    @ApiProperty({
        format: 'string',
      })
    @IsString()
    @IsNotEmpty()
    firstName: string;
    @ApiProperty({
        format: 'string',
      })
    @IsString()
    @IsNotEmpty() 
    middleName: string;
    @ApiProperty({
        format: 'Date',
      })
    @IsString()
    @IsNotEmpty() 
    birthday: Date;
    @ApiProperty({
        format: 'string',
      })
    @IsString()
    @IsNotEmpty() 
    city: string;
    @ApiProperty({
        format: 'string',
      })
    @IsString()
    @IsNotEmpty() 
    state: string;
    @ApiProperty({
        format: 'string',
      })
    @IsString()
    @IsNotEmpty() 
    role: string;
    @ApiProperty({
        format: 'boolean',
      })
    @IsBoolean()    
    isActive: boolean;
    @ApiProperty({
        format: 'boolean',
      })
    @IsBoolean()    
    isOnline: boolean;  
}