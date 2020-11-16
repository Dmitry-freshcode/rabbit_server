import { IChat} from './interfaces/chat.interface';
import { Model ,Types } from 'mongoose';
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

    async getChat(chatId:string):Promise<any | undefined>{
        return await this.chatModel.aggregate([
            {
              '$match': {
                '_id': Types.ObjectId(chatId)
              }
            }, {
              '$lookup': {
                'from': 'chatmembers', 
                'localField': '_id', 
                'foreignField': 'chatId', 
                'as': 'users'
              }
            }, {
              '$lookup': {
                'from': 'profiles', 
                'localField': 'users.userId', 
                'foreignField': 'userId', 
                'as': 'users'
              }
            }, {
              '$lookup': {
                'from': 'messages', 
                'localField': '_id', 
                'foreignField': 'chatId', 
                'as': 'messages'
              }
            }
          ]);
    }

    async findAll(chatId: string):Promise<IChat[] | undefined>{                     
        return await this.chatModel.find({chatId}).exec();
    }
    async createChat():Promise<IChat>{
        const newChat = new this.chatModel();
        return await newChat.save();
    }
    async updateChat(Chat:IChat):Promise<UpdateDto>{  
        return await this.chatModel.updateOne({_id:Chat._id},Chat);
    }
    async find(query:any):Promise<IChat | undefined>{                     
        return await this.chatModel.findOne(query).exec();
    }
    async delete(id:string):Promise<DeleteDto>{                
        return await this.chatModel.deleteOne({_id:id}).exec();
    }
   
    
    

}