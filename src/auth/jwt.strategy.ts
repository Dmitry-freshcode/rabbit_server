import { Injectable ,UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from './auth.service';
import { UserRepository } from '../user/user.repository';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService,
    private usersDB: UserRepository,   ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {     
    const user = await this.usersDB.findUserByEmail(payload.email);
    return user?true:false    
  }      
}