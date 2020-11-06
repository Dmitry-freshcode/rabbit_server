import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  forwardRef,
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
import { UserModule } from 'src/user/user.module';
import { CryptoService } from 'src/utils/crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(  
    private readonly jwtService: JwtService,
    private readonly UserService: UserService,
    private profileDB: ProfileRepository,
    private usersDB: UserRepository,
    private cryptoService:CryptoService,
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
    if(user && user.strategy === 'google'){
      throw new HttpException('Login with google', HttpStatus.BAD_REQUEST);
    }
    return null;
  }

  async login(data: LoginUserDto): Promise<any> {
    const isExist = await this.validateUser(data.email, data.password);    
    if (isExist) {
      const user = await this.usersDB.findUserByEmail(data.email);
      const token = await this.cryptoService.getToken(user)       
      //return await this.UserService.getUserState(token);
      return token;
    }
    throw new HttpException('Wrong email or pass', HttpStatus.BAD_REQUEST);
  }

  async getUserData(id: string): Promise<any> {
    const userState = await this.usersDB.getUserState(id);
     // const token = await this.cryptoService.getToken(userState);    
        return userState;
    }

    // async getMailToken(id: string): Promise<string> {
    //   const expiresIn = 60 * 60 * 24;
    //   const tokenPayload = {
    //     _id: id        
    //   };
    //   const token = await this.jwtService.sign(tokenPayload, {
    //     expiresIn: expiresIn,
    //     secret: process.env.SECRET,
    //   });
    //   return token;
    // }

  // async getToken(id: string): Promise<string> {
  //   const user = await this.usersDB.findUserById(id);
  //   // if (user.status === 'created') {
  //   //   throw new HttpException('Confirm email', HttpStatus.BAD_REQUEST);
  //   // }
  //     //const payload = { email: user.email, role: user.role };
  //     const payload = { id: user._id, role: user.role };
  //     const token = this.jwtService.sign(payload, {
  //       secret: `${process.env.JWT_SECRET}`,
  //     });
  //     return token;
      // return {
      //   access_token: token,
      //   id: user._id,
      //   role: user.role,
      //   status: user.status,
      // };
    
    
  //}


  async verifyGoogleToken(token: string): Promise<string | void> {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    async function verify(token) {
      const tokenInfo = await client.getTokenInfo(token);
      return tokenInfo.email;
    }
    return verify(token).catch(console.error);
  }

  async googleCreatAndLogin(token: string): Promise<any> {
    const email = await this.verifyGoogleToken(token);
    if (email) {
      const user = await this.usersDB.findUserByEmail(email);
      if (!user) {
        const newUser = await this.UserService.registerUser({
          email,
          status: 'confirmed',
          strategy: 'google',
          password: await this.cryptoService.passHash(process.env.JWT_SECRET),
        }); 
        const token =  await this.cryptoService.getToken(newUser); 
        return {access_token:token} ;   
      }
      const token =  await this.cryptoService.getToken(user);      
      return {access_token:token};
    }
    throw new HttpException('Wrong google token', HttpStatus.UNAUTHORIZED);
  }

  async confirmUser(token: string): Promise<any> {
    const decodedToken = await this.cryptoService.decodeToken(token);    
    if (!decodedToken) {
      throw new HttpException('Wrong token', HttpStatus.UNAUTHORIZED);
    };
    if (!decodedToken.valid) {
      throw new HttpException('Token is old, get new token', HttpStatus.PARTIAL_CONTENT);
    }       
    const user = await this.usersDB.findUserById(decodedToken.id);
    if (!user) {
      throw new HttpException('User not found, please signup', HttpStatus. CONFLICT);
    }    
    const isProfile = await this.profileDB.findProfileByUserId(user._id);   
    if (isProfile) {
      throw new HttpException('Profile is exist', HttpStatus. BAD_REQUEST);
    }      
    if (
      user.status === 'created'    
    ) {    
     await this.usersDB.updateById(user._id,{status:"confirmed"});     
      this.logger.log(`confirm ${user.email} user`); 
    }
   return await this.cryptoService.getToken(user);
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
