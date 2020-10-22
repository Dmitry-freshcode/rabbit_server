import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '../dto/loginUser.dto'


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(username:string, password:string): Promise<string> {      
    const user = await this.authService.validateUser(username,password); 
    if (!user) {   
      throw new HttpException('Wrong email or pass', HttpStatus.BAD_REQUEST);          
    }
    return username;   
  }
}