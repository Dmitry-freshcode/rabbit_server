import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUser.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service'
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly UserService: UserService,
    private usersDB: UserRepository,
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersDB.findUserByEmail(email);
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      return compare;
    }
    return null;
  }

  async getToken(email: string): Promise<LoginResponseDto> {
    const user = await this.usersDB.findUserByEmail(email);
    if (user.status === 'confirmed') {
      const payload = { email: user.email, role: user.role };
      const token = this.jwtService.sign(payload, {
        secret: `${process.env.JWT_SECRET}`,
      });
      return {
        access_token: token,
        email: user.email,
        role: user.role,
      };
    }
    throw new HttpException('Confirm email', HttpStatus.BAD_REQUEST);
  }

  async login(data: LoginUserDto): Promise<LoginResponseDto> {
    const isExist = await this.validateUser(data.email, data.password);
    if (isExist) {
      return await this.getToken(data.email);
    }
    throw new HttpException('Wrong email or pass', HttpStatus.BAD_REQUEST);
  }

  async verifyGoogleToken(token: string): Promise<string | void> {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    async function verify(token) {
      const tokenInfo = await client.getTokenInfo(token);
      return tokenInfo.email;
    }
    return verify(token).catch(console.error);
  }

  async googleCreatLogin(token: string): Promise<LoginResponseDto> {
    const email = await this.verifyGoogleToken(token);
    if (email) {
      const user = await this.usersDB.findUserByEmail(email);
      if(!user){
        await this.UserService.register({
          email,
          strategy:'google'
        })
      }
      return this.getToken(email);
    }
  }
}
