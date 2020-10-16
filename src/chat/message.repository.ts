import { IMessage } from './interfaces/message.interface';
import { Model , Types } from 'mongoose';
import { CreateMessageDto } from './dto/message.dto';
import { DeleteDto } from '../shared/dto/delete.dto';
import { UpdateDto } from '../shared/dto/update.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatMessageDto } from './dto/chatMessage.dto'


@Injectable()
export class MessageRepository{
    constructor(
        @InjectModel('Message')
        private messageModel: Model<IMessage>,
      
        ){}

    async findAll(chatId:string):Promise<IMessage[] | undefined>{                     
        return await this.messageModel.find({chatId}).exec();
    }
    async createMessage(Message:CreateMessageDto):Promise<IMessage>{
        const message = new this.messageModel(Message);
        return await message.save();
    }
    async updateMessage(Message:IMessage):Promise<UpdateDto>{  
        return await this.messageModel.updateOne({_id:Message._id},Message);
    }
    // async find(id:string):Promise<IMessage | undefined>{                     
    //     return await this.messageModel.findOne({_id:id}).exec();
    // }
    async delete(id:string):Promise<DeleteDto>{                
        return await this.messageModel.deleteOne({_id:id}).exec();
    }
    async getChatMsgs(id:string):Promise<ChatMessageDto[]>{                           
        return await this.messageModel.aggregate([
            {
              '$match': {
                'chatId': Types.ObjectId(id)
              }
            }, {
              '$lookup': {
                'from': 'profiles', 
                'localField': 'userId', 
                'foreignField': 'userId', 
                'as': 'user'
              }
            }, {
              '$unwind': '$user'
            }, {
              '$project': {
                'userId': 1, 
                'chatId': 1, 
                'message': 1, 
                'created_at': 1, 
                'updated_at': 1, 
                'firstName': '$user.firstName',
                'lastName': '$user.lastName',
              }
            }
          ]);
    }

}