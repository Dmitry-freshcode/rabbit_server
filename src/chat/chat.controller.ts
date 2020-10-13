import {
    Controller,
    Body,
    Logger,   
    Query,    
    //UseGuards,       
    Get,
    Post,  
  } from '@nestjs/common';
  import { ApiTags, ApiResponse } from '@nestjs/swagger';
  import { ChatService } from './chat.service';
  import { ChatRepository } from './chat.repository';
  import { MessageRepository } from './message.repository';
  import { ChatMemberRepository } from './chatMember.repository'
  import { IMessage } from './interfaces/message.interface'
  import { CreateMessageDto } from './dto/message.dto';
  import { ChatMessageDto } from './dto/chatMessage.dto';
  import { UserChatsDto } from './dto/userChats.dto'
  import { IChat } from './interfaces/chat.interface'
  import {SuccessDto} from '../shared/dto/success.dto';


  @ApiTags('chat')
  @Controller('chat')
export class ChatController {
    private readonly logger = new Logger(ChatController.name);
    constructor(
        private readonly chatService: ChatService,
        private readonly chatDB: ChatRepository,
        private readonly messageDB: MessageRepository,
        private readonly chatMemberDB: ChatMemberRepository,
      ) {}
      @Post('addChat')
      @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
        async addChat(
            @Body('userId') userId: string,
            @Body('staffId') staffId: string,             
        ): Promise<IChat> {               
          return this.chatService.createChat(userId,staffId);  
      }
      @Post('addMessage')
      @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
      async addMessage(@Body() msg: CreateMessageDto ): Promise<IMessage> {                 
        return this.messageDB.createMessage(msg);  
      }
      @Get('getUserChats')
      @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
      async getUserChats(@Query('userId') userId: string):Promise<UserChatsDto[]>{       
       return this.chatMemberDB.getUserChats(userId);  
      }
      @Get('getChatMsgs')
      @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
      async getChatMsgs(@Query('chatId') chatId: string): Promise<ChatMessageDto[] | undefined> { 
       return this.messageDB.getChatMsgs(chatId);  
      }

}
