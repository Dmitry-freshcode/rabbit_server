import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail} from 'class-validator';

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
    password?: string;
    @ApiProperty({
      format: 'string',
    }) 
    @IsString()
      role?: string; 
    @ApiProperty({
      format: 'string',
    }) 
    @IsString()
    strategy: string;       
}
