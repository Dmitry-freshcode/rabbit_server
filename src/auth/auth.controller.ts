import { Controller, UseGuards, Post,Body,Get,Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUserDto } from './dto/loginUser.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('auth')
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

      @Get('google')
      @UseGuards(AuthGuard('google'))
      async googleAuth(@Req() req) {}


      @Get('google/redirect')
      @UseGuards(AuthGuard('google'))
      async googleAuthRedirect(@Req() req) {        
       return this.authService.googleCreatLogin(req.user.accessToken);
      }

      
}
