import { IChat} from './interfaces/chat.interface';
import { Model } from 'mongoose';
import { DeleteDto } from '../shared/dto/delete.dto';
import { UpdateDto } from '../shared/dto/update.dto';
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
    async updateChat(Chat:IChat):Promise<UpdateDto>{  
        return await this.chatModel.updateOne({_id:Chat._id},Chat);
    }
    // async find(id:string):Promise<IChat | undefined>{                     
    //     return await this.chatModel.findOne({_id:id}).exec();
    // }
    async delete(id:string):Promise<DeleteDto>{                
        return await this.chatModel.deleteOne({_id:id}).exec();
    }
    

}