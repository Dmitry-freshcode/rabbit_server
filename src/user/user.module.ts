import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserRepository} from './user.repository';
import { ProfileRepository } from './profile.repository'
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { ProfileSchema } from './schemas/profile.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    //JwtService,
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema},
      {name: 'Profile', schema: ProfileSchema},     
    ]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
    
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    ProfileRepository
   // JwtService
  ],
  exports: [UserRepository],
})
export class UserModule {}

