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
        const user = await this.usersDB.findUserByEmail(data.username);    
        if(user) {
          const compare = await bcrypt.compare(data.password, user.password);                  
          return compare;
        }                
        return null;        
      }

    async login(data:LoginUserDto):Promise<any> {    
        const isExist =  await this.validateUser(data);        
        if (isExist) {
          const user = await this.usersDB.findUserByEmail(data.username);
            const payload = { email: data.username };           
            return {
                  access_token: this.jwtService.sign(payload, {secret : process.env.SECRET}),
                  email: data.username,
                  role: user.role,
                };    
        }     
         return {error:'wrong email or pass'};       
      }
}
