import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMessageDto { 
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
}
