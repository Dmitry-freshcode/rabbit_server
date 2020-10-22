import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUser.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { AuthorizationDto } from '../user/dto/authorization.dto';
import { UserRepository } from '../user/user.repository';
import { ProfileRepository } from '../user/profile.repository';
import { UserService } from '../user/user.service';
import { OAuth2Client } from 'google-auth-library';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly UserService: UserService,
    private profileDB: ProfileRepository,
    private usersDB: UserRepository,
  ) {}

  errorRes(value, msg: string): void {
    if (value) {
      throw new HttpException(msg, HttpStatus.CONFLICT);
    }
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersDB.findUserByEmail(email);
    if (user && user.strategy === 'local') {
      const compare = await bcrypt.compare(password, user.password);
      return compare;
    }
    return null;
  }

  async getToken(id: string): Promise<AuthorizationDto> {
    const user = await this.usersDB.findUserById(id);
    if (user.status === 'created') {
      throw new HttpException('Confirm email', HttpStatus.BAD_REQUEST);
    }
      const payload = { email: user.email, role: user.role };
      const token = this.jwtService.sign(payload, {
        secret: `${process.env.JWT_SECRET}`,
      });
      return {
        access_token: token,
        id: user._id,
        role: user.role,
        status: user.status,
      };
    
    
  }

  async login(data: LoginUserDto): Promise<AuthorizationDto> {
    const isExist = await this.validateUser(data.email, data.password);
    if (isExist) {
      const user = await this.usersDB.findUserByEmail(data.email);
      return await this.getToken(user._id);
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

  async googleCreatAndLogin(token: string): Promise<AuthorizationDto> {
    const email = await this.verifyGoogleToken(token);
    if (email) {
      const user = await this.usersDB.findUserByEmail(email);
      if (!user) {
        const newUser = await this.UserService.register({
          email,
          status: 'confirmed',
          strategy: 'google',
          password: process.env.JWT_SECRET,
        });
        return newUser;
      }
      return this.getToken(user._id);
    }
  }

  async confirmUser(token: string): Promise<any> {
    const decoded = await this.jwtService.decode(token, { json: true });   
    this.errorRes(!decoded, 'Wrong token');
    const user = await this.usersDB.findUserById(decoded['_id']);
    this.errorRes(!user, 'User not found, please signup');
    const isProfile = await this.profileDB.findProfileByUserId(decoded['_id']); 
    this.errorRes(!(moment(new Date(decoded['exp'] * 1000)).isAfter(Date.now())), 'Token is old, get new token');
    if(isProfile) {
      this.getToken(isProfile._id);
    }    
    if (
      user.status === 'created'    
    ) {    
      await this.usersDB.updateById(decoded['_id'],{status:"confirmed"});     
      this.logger.log(`confirm ${user.email} user`); 
    }
   return this.getToken(user._id);
  }

  getUrl(url: string, params?): string {
    let resUrl = url;
    if (params) {
      resUrl = url + '?';
      const keys = Object.keys(params);
      keys.forEach((key, i) => {
        resUrl += key + '=' + params[key];
        if (i < keys.length - 1) {
          resUrl += '&';
        }
      });
    }
    return resUrl;
  }
}
