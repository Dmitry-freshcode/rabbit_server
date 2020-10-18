import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import {UserModule} from '../user/user.module'
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [  
    ConfigModule.forRoot(),    
    UserModule,       
    PassportModule,         
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
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService]
})
export class AuthModule {}
