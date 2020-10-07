import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import {UserService} from '../user/user.service';
import {UserRepository} from '../user/user.repository';

@Module({
  imports: [    
    //JwtStrategy,
    
    UserService,    
    PassportModule,      
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,LocalStrategy,UserRepository,],
  exports: [AuthService]
})
export class AuthModule {}
