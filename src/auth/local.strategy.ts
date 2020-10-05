import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  // Promise<any> ->  Promise<Object>
  async validate(username: string, password: string): Promise<Object> {  
    console.log(username, password)  ;
    // const user = await this.authService.validateUser(username, password); 
    // if (!user) {   
    //   throw new UnauthorizedException({statusCode: 401, message: "Unauthorized"});          
    // }
    return username;
  }
}