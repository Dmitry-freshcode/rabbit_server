import { Controller, UseGuards, Post,Body, Request,Get,Query} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtAuthGuard} from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { from } from 'rxjs';

@Controller('auth')
export class AuthController { 
    constructor(
        private authService: AuthService,              
      ) { } 
      @Post('login') 
      @UseGuards(LocalAuthGuard)
      async login(@Body() loginUser:LoginUserDto) {                    
        return this.authService.login(loginUser);
      }
      @Get('test') 
      @UseGuards(AuthGuard('jwt'))
      async test(@Query('userId') loginUser) {                
        return loginUser;
      }
}
