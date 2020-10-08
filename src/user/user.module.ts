import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserRepository} from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { ProfileSchema } from './schemas/profile.schema';
import { RegistrationSchema } from './schemas/registration.schema'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';




@Module({
  imports: [
    ConfigModule.forRoot(),
    //JwtService,
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema},
      {name: 'Profile', schema: ProfileSchema},
      {name: 'Registration', schema: RegistrationSchema}
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
   // JwtService
  ],
  exports: [UserService],
})
export class UserModule {}

