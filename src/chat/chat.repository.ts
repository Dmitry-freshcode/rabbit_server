import { IChat} from './interfaces/chat.interface';
import { Model } from 'mongoose';
import { IMessage} from './interfaces/message.interface'
//import { CreateChatDto } from './dto/chats.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ChatRepository{
    constructor(
        @InjectModel('Chat')
        private chatModel: Model<IChat>,

      
        ){}

    async findAll(chatId: string):Promise<IChat[] | undefined>{                     
        return await this.chatModel.find({chatId}).exec();
    }
    async createChat():Promise<IChat>{
        const chat = new this.chatModel();
        return await chat.save();
    }
    async updateChat(Chat:IChat):Promise<any>{  
        return await this.chatModel.updateOne({_id:Chat._id},Chat);
    }
    // async find(id:string):Promise<IChat | undefined>{                     
    //     return await this.chatModel.findOne({_id:id}).exec();
    // }
    async delete(id:string):Promise<any>{                
        return await this.chatModel.deleteOne({_id:id}).exec();
    }
    

}