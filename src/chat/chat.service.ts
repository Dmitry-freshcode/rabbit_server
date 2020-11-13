import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { ChatMemberRepository } from './chatMember.repository';
import { MessageRepository } from './message.repository';
import { IChat } from './interfaces/chat.interface';
import { IMessage } from './interfaces/message.interface';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  constructor(
    private chatDB: ChatRepository,
    private chatMemberDB: ChatMemberRepository,
    private readonly messageDB: MessageRepository,
  ) {}

  async createChat(data: any): Promise<IChat> {
    const chat = await this.chatDB.createChat();
    this.logger.log(`chat id:${chat._id} was created`);

    await this.chatMemberDB.createChatMember({
      userId: data.userId,
      chatId: chat._id,
    });
    await this.chatMemberDB.createChatMember({
      userId: data.staffId,
      chatId: chat._id,
    });
    return chat;
  }

  async getChat(userId: string, staffId: string): Promise<any> {
    const users = { userId, staffId };
    const chat = await this.chatMemberDB.findByUsers(users);
    if (chat.length > 0) {
      return chat[0];
    }
    await this.createChat(users);
    const newChat = await this.chatMemberDB.findByUsers(users)
    return newChat[0];
  }

  // async getMessage(chatId:string):Promise<IMessage[] | undefined>{

  //     return ;
  // }
}
