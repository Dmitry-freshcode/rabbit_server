import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional} from 'class-validator';

export class CreateUserDto { 
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()
    @IsEmail()
    email: string;
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()
    password: string;   
    @ApiProperty({
      format: 'string',
    }) 
    @IsOptional()
    @IsString()
    strategy: string;
    @ApiProperty({
      format: 'string',
    }) 
    @IsOptional()
    @IsString()
    status: string;        
}
