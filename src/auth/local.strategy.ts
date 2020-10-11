import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(data:LoginUserDto): Promise<string> {  
    console.log(data)  ;
    const user = await this.authService.validateUser(data); 
    if (!user) {   
      throw new UnauthorizedException({statusCode: 401, message: "Unauthorized"});          
    }
    return data.email;
  }
}