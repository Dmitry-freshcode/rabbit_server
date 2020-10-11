import { Controller, UseGuards, Post,Body, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUserDto } from './dto/loginUser.dto'
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController { 
    constructor(
        private authService: AuthService,              
      ) {}  
      @UseGuards(LocalAuthGuard)  
      @Post('login')
      async login(@Body() loginUser:LoginUserDto) {
        console.log(loginUser)
        //return {status:"login"};
        return this.authService.login(loginUser);
      }



      // async login(@Body() loginUser:LoginUserDto) {
      //   console.log(loginUser)
      //   //return {status:"login"};
      //   return this.authService.login(loginUser);
      // }

}
