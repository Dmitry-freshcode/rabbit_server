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
    async validateUser(email:string,password:string): Promise<boolean> {  
        const user = await this.usersDB.findUserByEmail(email);
        if(user) {
          const compare = await bcrypt.compare(password, user.password);                          
          return compare;
        }                
        return null;        
      }

    async login(data:LoginUserDto):Promise<any> {       
        const isExist =  await this.validateUser(data.email,data.password);                        
        if (isExist) {
          const user = await this.usersDB.findUserByEmail(data.email);
            const payload = { email: data.email, role: user.role };
            const token = this.jwtService.sign(payload, {secret : `${process.env.JWT_SECRET}`});
            return {
                  access_token: token,
                  email: data.email,
                  role: user.role,
                };    
        }     
         return {error:'wrong email or pass'};       
      }
}
