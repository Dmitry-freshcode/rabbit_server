import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Req,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthorizationDto } from '../user/dto/authorization.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')  
  @UseGuards(LocalAuthGuard)  
  async login(@Body() loginUser: LoginUserDto):Promise<AuthorizationDto> {  
    return  await this.authService.login(loginUser);    
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @Redirect()
  async googleAuth(@Req() req) {
    return {
      url: `${process.env.FRONT_URL}/callbackGoogle`
    };
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect()
  async googleAuthRedirect(@Req() req) {   
    const data = await this.authService.googleCreatAndLogin(req.user.accessToken);    
    return {
      url: this.authService.getUrl(`${process.env.FRONT_URL}/authorization/callbackGoogle`,data)
    };
  }


}
