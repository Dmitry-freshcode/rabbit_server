import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserRepository} from './user.repository';
import { ProfileRepository } from './profile.repository';
import { LocationRepository } from './location.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { ProfileSchema } from './schemas/profile.schema';
import { LocationSchema } from './schemas/location.schema'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),    
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema},
      {name: 'Profile', schema: ProfileSchema},
      {name: 'Location', schema: LocationSchema},      
    ]),
    
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
    
    MulterModule.register({
      dest: './uploads',
    }),
    
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    ProfileRepository,
    LocationRepository,
  ],
  exports: [UserRepository,LocationRepository],
})
export class UserModule {}

