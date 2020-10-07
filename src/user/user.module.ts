import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserRepository} from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { ProfileSchema } from './schemas/profile.schema';



@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema},{name: 'Profile', schema: ProfileSchema}]),
    //UserRepository
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository
  ],
  exports: [UserService],
})
export class UserModule {}
