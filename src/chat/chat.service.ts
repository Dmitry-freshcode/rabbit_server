import { Injectable ,HttpException,HttpStatus,Logger} from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { ChatMemberRepository } from './chatMember.repository';
import { MessageRepository } from './message.repository';
import { IChat } from './interfaces/chat.interface';
import { IMessage } from './interfaces/message.interface';

@Injectable()
export class ChatService {
    private readonly logger = new Logger(ChatService.name);
    constructor(  
     private chatDB:ChatRepository,  
     private chatMemberDB:ChatMemberRepository, 
     private readonly messageDB: MessageRepository,
    ) {}

    async createChat(userId:string,staffId:string): Promise<IChat>{
        const chat = await this.chatDB.createChat();
        this.logger.log(`chat id:${chat._id} was created`); 
        await this.chatMemberDB.createChatMember({
            userId,
            chatId:chat._id
        });
        await this.chatMemberDB.createChatMember({
            userId: staffId,
            chatId:chat._id
        });
        return chat;
    }

    async getMessage(chatId:string):Promise<IMessage[] | undefined>{
       
        return ;
    }

}
