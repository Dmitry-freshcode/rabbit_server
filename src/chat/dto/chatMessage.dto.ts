import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class ChatMessageDto { 
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    userId: string;
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    chatId: string;
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    message: string;
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
        format: 'Date',
      }) 
    @IsString()    
    firstName: string;
}
