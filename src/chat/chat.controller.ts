import {
  Controller,
  Body,
  Logger,
  Query,
  UseGuards,
  Get,
  Post,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';
import { MessageRepository } from './message.repository';
import { ChatMemberRepository } from './chatMember.repository';
import { IMessage } from './interfaces/message.interface';
import { CreateMessageDto } from './dto/message.dto';
import { ChatMessageDto } from './dto/chatMessage.dto';
import { UserChatsDto } from './dto/userChats.dto';
import { IChat } from './interfaces/chat.interface';
import { SuccessDto } from '../shared/dto/success.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('chat')
//@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  private readonly logger = new Logger(ChatController.name);
  constructor(
    private readonly chatService: ChatService,
    private readonly chatDB: ChatRepository,
    private readonly messageDB: MessageRepository,
    private readonly chatMemberDB: ChatMemberRepository,
  ) {}

  @Post()
  @ApiBody({ type: Object })
  @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
  async addChat(@Body() data: any): Promise<IChat> {
    return this.chatService.createChat(data);
  }

  @Post('message')
  @ApiResponse({ status: 200, description: 'OK', type: CreateMessageDto })
  async addMessage(@Body() msg: CreateMessageDto): Promise<IMessage> {
    return this.messageDB.createMessage(msg);
  }

  @Get('messages')
  @ApiResponse({ status: 200, description: 'OK', type: String })
  async getMsgs(
    @Query('chatId') chatId: string  
  ): Promise<any> {
    const msgs = await this.messageDB.findAll(chatId)
    return msgs;
  }

  @Get()
  @ApiResponse({ status: 200, description: 'OK', type: [UserChatsDto] })
  async getChat(
    @Query('chatId') chatId: string  
  ): Promise<any> {
    const chat = await this.chatDB.getChat(chatId)
    return chat[0];
  }

  @Delete()
  @ApiResponse({ status: 200, description: 'OK', type: [UserChatsDto] })
  async deleteChat(
    @Query('chatId') chatId: string  
  ): Promise<any> {
    const result = await this.chatService.deleteChat(chatId)
    return result;
  }

  @Get('getChatById')
  @ApiResponse({ status: 200, description: 'OK', type: [UserChatsDto] })
  async getChats(
    @Query('userId') userId: string,
    @Query('staffId') staffId: string,
  ): Promise<UserChatsDto[]> {
    return this.chatService.getChat(userId, staffId);
  }

  @Get('userChats')
  @ApiResponse({ status: 200, description: 'OK', type: [UserChatsDto] })
  async getUserChats(@Query('userId') userId: string): Promise<UserChatsDto[]> {
    return this.chatMemberDB.getUserChats(userId);
  }

  @Get('ChatMsgs')
  @ApiResponse({ status: 200, description: 'OK', type: [ChatMessageDto] })
  async getChatMsgs(
    @Query('chatId') chatId: string,
  ): Promise<ChatMessageDto[] | undefined> {
    return this.messageDB.getChatMsgs(chatId);
  }
}
