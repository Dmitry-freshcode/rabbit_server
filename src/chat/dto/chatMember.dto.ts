import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateChatMemberDto { 
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
}
