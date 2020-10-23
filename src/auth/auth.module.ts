import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { GoogleStrategy } from './strategy/google.strategy'
import {UserModule} from '../user/user.module'
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './role/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserService } from '../user/user.service'
import { CryptoService } from 'src/utils/crypto';



@Module({
  imports: [  
    ConfigModule.forRoot(),    
    UserModule,       
    PassportModule,
    //UserService,         
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' },
      
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    GoogleStrategy,
    CryptoService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService]
})
export class AuthModule {}