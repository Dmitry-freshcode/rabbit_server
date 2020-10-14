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

    async createChat(users:string[]): Promise<IChat>{
        const chat = await this.chatDB.createChat();
        this.logger.log(`chat id:${chat._id} was created`);
        users.forEach(async (user)=>{
            await this.chatMemberDB.createChatMember({
                userId:user,
                chatId:chat._id
            });
        })
        return chat;
    }

  

    // async getMessage(chatId:string):Promise<IMessage[] | undefined>{
       
    //     return ;
    // }

}
