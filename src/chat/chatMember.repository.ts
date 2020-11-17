import { IChatMember } from './interfaces/chatMember.interface';
import { Model , Types} from 'mongoose';
import { CreateChatMemberDto } from './dto/chatMember.dto';
import { UserChatsDto } from './dto/userChats.dto';
import { DeleteDto } from '../shared/dto/delete.dto';
import { UpdateDto } from '../shared/dto/update.dto';
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
    async deleteAll(chatId:string):Promise<any | undefined>{
      return await this.chatMemberModel.deleteMany({chatId:chatId});
    }

    async createChatMember(ChatMember:CreateChatMemberDto):Promise<IChatMember>{
        const chatMember = new this.chatMemberModel(ChatMember);
        return await chatMember.save();
    }
    async updateChatMember(ChatMember:IChatMember):Promise<UpdateDto>{  
        return await this.chatMemberModel.updateOne({_id:ChatMember._id},ChatMember);
    }
    async find(id:string):Promise<IChatMember | undefined>{                     
        return await this.chatMemberModel.findOne({_id:id}).exec();
    }
    async delete(id:string):Promise<DeleteDto>{                
        return await this.chatMemberModel.deleteOne({_id:id}).exec();
    }
    async findByUsers(data:any):Promise<any>{                
      return await this.chatMemberModel.aggregate([
        {
          '$match': {
            '$or': [
              {
                'userId': Types.ObjectId(data.userId)
              }, {
                'userId': Types.ObjectId(data.staffId)
              }
            ]
          }
        }, {
          '$group': {
            '_id': {
              '_id': '$chatId'
            }, 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$match': {
            'count': {
              '$gte': 2
            }
          }
        }, {
          '$project': {
            '_id': '$_id._id'
          }
        }, {
          '$lookup': {
            'from': 'messages', 
            'localField': '_id', 
            'foreignField': 'chatId', 
            'as': 'messages'
          },
        },{
          '$lookup': {
            'from': 'chatmembers', 
            'localField': '_id', 
            'foreignField': 'chatId', 
            'as': 'users'
          },
        },{
          '$lookup': {
            'from': 'profiles', 
            'localField': 'users.userId', 
            'foreignField': 'userId', 
            'as': 'users'
          },
        }
      ]);
  }
    
    async getUserChats(id:string):Promise<UserChatsDto[]>{                     
        return await this.chatMemberModel.aggregate(
          [
            {
                '$match': {
                    'userId': Types.ObjectId(id)
                }
            },  {
                '$lookup': {
                  'from': 'chatmembers', 
                  'localField': 'chatId', 
                  'foreignField': 'chatId', 
                  'as': 'members'
                }
              },
              //  {
              //   '$lookup': {
              //     'from': 'users', 
              //     'localField': 'members.userId', 
              //     'foreignField': '_id', 
              //     'as': 'users'
              //   }
              // },
              //  {
              //   '$lookup': {
              //     'from': 'images', 
              //     'localField': 'users._id', 
              //     'foreignField': 'userId', 
              //     'as': 'usersImg'
              //   }
              // },
               {
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
                  'as': 'usersProfiles'
                }
              }, {
                '$project': {
                  '_id':0,
                  'chatId':1,
                  'created_at': 1, 
                  'updated_at': 1, 
                  //'users': 1, 
                  //'usersImg': 1, 
                  'usersProfiles': 1, 
                  'messages': {
                    '$size': '$msg'
                  }
                }
              }
        ]
        );
    }

}