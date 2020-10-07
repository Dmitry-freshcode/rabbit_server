import { Controller, UseGuards, Post,Body, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUserDto } from './dto/loginUser.dto'

@Controller('auth')
export class AuthController { 
    constructor(
        private authService: AuthService,              
      ) {}  
      @UseGuards(LocalAuthGuard)  
      @Post('login')
      async login(@Body() loginUser:LoginUserDto) {
        //console.log(body)
        //return {status:"login"};
        return this.authService.login(loginUser);
      }

}
