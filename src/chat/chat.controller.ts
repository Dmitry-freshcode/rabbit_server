import {
  Controller,
  Body,
  Logger,
  Query,
  UseGuards,
  Get,
  Post,
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

  @Post('Message')
  @ApiResponse({ status: 200, description: 'OK', type: CreateMessageDto })
  async addMessage(@Body() msg: CreateMessageDto): Promise<IMessage> {
    return this.messageDB.createMessage(msg);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'OK', type: [UserChatsDto] })
  async getChats(
    @Query('userId') userId: string,
    @Query('staffId') staffId: string,
  ): Promise<UserChatsDto[]> {
    return this.chatService.getChat(userId, staffId);
  }

  @Get('UserChats')
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
