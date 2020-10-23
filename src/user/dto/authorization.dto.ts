import { ApiProperty } from '@nestjs/swagger';
import { IsString  } from 'class-validator';

export class AuthorizationDto { 
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()   
    id: string;
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()
    status: string;   
    @ApiProperty({
      format: 'string',
    })     
    @IsString()
    role: string;
    @ApiProperty({
      format: 'string',
    })      
    @IsString()
    access_token: string;        
}