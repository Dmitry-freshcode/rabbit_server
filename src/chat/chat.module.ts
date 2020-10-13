import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schemas/chat.schema';
import { ChatMemberSchema } from './schemas/chatMember.schema';
import { MessageSchema } from './schemas/message.schema';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatRepository } from './chat.repository';
import { ChatMemberRepository } from './chatMember.repository';
import { MessageRepository } from './message.repository';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'Chat', schema: ChatSchema},
      {name: 'ChatMember', schema: ChatMemberSchema},
      {name: 'Message', schema: MessageSchema},    
    ]),
  ],
  providers: [ChatService,ChatRepository,ChatMemberRepository,MessageRepository],
  controllers: [ChatController],
  exports:[ChatRepository,ChatMemberRepository,MessageRepository]
})
export class ChatModule {}
