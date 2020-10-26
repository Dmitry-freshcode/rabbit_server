import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/user/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { TokenDto } from 'src/user/dto/token.dto';

@Injectable()
export class CryptoService {
  constructor(private readonly jwtService: JwtService) {}

  async getMailToken(id: string): Promise<string> {
    const expiresIn = 60 * 60 * 24;
    const tokenPayload = {
      id: id,
    };
    const token = await this.jwtService.sign(tokenPayload, {
      expiresIn: expiresIn,
      secret: process.env.SECRET,
    });
    return token;
  }

  async decodeToken(token: string): Promise<TokenDto> {    
    const decoded = await this.jwtService.decode(token, { json: true });   
    if (decoded) {
      const dec = {
        id: decoded['id'],
        role: decoded['role'],
        iat: decoded['iat'],
        exp: decoded['exp'],
      };
      if (moment(new Date(decoded['exp'] * 1000)).isAfter(Date.now())) {
        return { ...dec, valid: true };
      } else {
        return { ...dec, valid: false };
      }
    }
    return null;
  }

  async getToken(user: any): Promise<string> {   
    const payload = { id: user._id, role: user.role };
    const token = await this.jwtService.sign(payload, {
      secret: `${process.env.JWT_SECRET}`,
    });    
    return token;
  }

  async passHash(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
