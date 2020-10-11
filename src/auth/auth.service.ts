import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUser.dto'
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private usersDB: UserRepository,        
        //private readonly tokenService: TokenService,
    ) { }
    async validateUser(data:LoginUserDto): Promise<boolean> {                
        const user = await this.usersDB.findUserByEmail(data.email);    
        if(user) {
          const compare = await bcrypt.compare(data.password, user.password);            
          return compare;
        }                
        return null;        
      }

    async login(data:LoginUserDto):Promise<any> {    
        const isExist =  await this.validateUser(data);
        if (isExist) {
            const payload = { email: data.email };           
            return {
                  access_token: this.jwtService.sign(payload, {secret : process.env.SECRET}),
                  email: data.email,
                };    
        }     
         return {error:'wrong email or pass'};       
      }
}
