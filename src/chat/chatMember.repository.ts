import { IChatMember } from './interfaces/chatMember.interface';
import { Model , Types} from 'mongoose';
import { CreateChatMemberDto } from './dto/chatMember.dto';
import { UserChatsDto } from './dto/userChats.dto'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ChatMemberRepository{
    constructor(
        @InjectModel('ChatMember')
        private chatMemberModel: Model<IChatMember>,
      
        ){}

    async findAll():Promise<IChatMember[] | undefined>{                     
        return await this.chatMemberModel.find({}).exec();
    }
    async createChatMember(ChatMember:CreateChatMemberDto):Promise<IChatMember>{
        const chatMember = new this.chatMemberModel(ChatMember);
        return await chatMember.save();
    }
    async updateChatMember(ChatMember:IChatMember):Promise<any>{  
        return await this.chatMemberModel.updateOne({_id:ChatMember._id},ChatMember);
    }
    async find(id:string):Promise<IChatMember | undefined>{                     
        return await this.chatMemberModel.findOne({_id:id}).exec();
    }
    async delete(id:string):Promise<any>{                
        return await this.chatMemberModel.deleteOne({_id:id}).exec();
    }
    async getUserChats(id:string):Promise<UserChatsDto[]>{                     
        return await this.chatMemberModel.aggregate(
          [
            {
                '$match': {
                    'userId': Types.ObjectId(id)
                }
            }, {
                '$lookup': {
                    'from': 'chatmembers', 
                    'localField': 'chatId', 
                    'foreignField': 'chatId', 
                    'as': 'members'
                }
            }, {
                '$lookup': {
                    'from': 'messages', 
                    'localField': 'chatId', 
                    'foreignField': 'chatId', 
                    'as': 'msg'
                }
            }, {
                '$lookup': {
                    'from': 'profiles', 
                    'localField': 'members.userId', 
                    'foreignField': 'userId', 
                    'as': 'members'
                }
            }, {
                '$project': {
                    'created_at': 1, 
                    'updated_at': 1, 
                    'members.userId': 1, 
                    'members.firstName': 1, 
                    'members.lastName': 1,
                    'members.isOnline': 1, 
                    'messages': {
                        '$size': '$msg'
                    }
                }
            }
        ]
        );
    }

}