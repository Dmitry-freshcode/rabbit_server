import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsString, IsDateString, IsBoolean, IsInt } from 'class-validator';

export class UserChatsDto { 
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    _id: string;
    @ApiProperty({
        format: 'Date',
      }) 
    @IsDateString()    
    created_at: Date;
    @ApiProperty({
        format: 'Date',
      }) 
    @IsDateString()    
    updated_at: Date;
    @ApiProperty({
        format: 'array',
      }) 
    @IsArray()    
    members: ChatUseDto[]   
    @ApiProperty({
      format: 'number',
    }) 
    @IsInt()    
    messages: number;   
}

class ChatUseDto { 
    @ApiProperty({
        format: 'boolean',
      }) 
    @IsBoolean()    
    isOnline: boolean;
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
        userId: string;
    @ApiProperty({
        format: 'string',
          }) 
    @IsString()    
        firstName: string;  
    @ApiProperty({
        format: 'string',
            }) 
    @IsString()    
        lastName: string;     
}
