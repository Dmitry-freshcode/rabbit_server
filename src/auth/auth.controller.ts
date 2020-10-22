import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Req,
  Redirect,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthorizationDto } from '../user/dto/authorization.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { SuccessDto } from '../shared/dto/success.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginUser: LoginUserDto): Promise<AuthorizationDto> {
    return await this.authService.login(loginUser);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @Redirect()
  async googleAuth(@Req() req) {
    return {
      url: `${process.env.FRONT_URL}/callbackGoogle`,
    };
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect()
  async googleAuthRedirect(@Req() req) {
    const data = await this.authService.googleCreatAndLogin(
      req.user.accessToken,
    );
    return {
      url: this.authService.getUrl(
        `${process.env.FRONT_URL}/authorization/callbackGoogle`,
        data,
      ),
    };
  }

  @Get('confirmUser')
  async confirm(@Query('token') token: string): Promise<any> {
    const req = await this.authService.confirmUser(token);
    return req;
  }

  @Get('updateToken')
  @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
  async updateToken(@Query('email') email: string): Promise<SuccessDto> {
    return this.userService.updateMail(email);
  }
}
