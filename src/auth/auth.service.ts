import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private usersService: UserService,        
        //private readonly tokenService: TokenService,
    ) { }
    async validateUser(data:CreateUserDto): Promise<Boolean> {            
        const user = await this.usersService.findOne(data);    
        if(user) {
          const compare = await bcrypt.compare(data.password, user.password); 
          return compare;
        }                
        return false;
        
      }

    async login(data:CreateUserDto):Promise<object> {    
        const isExist =  await this.validateUser(data);
        if (isExist) {
            const payload = { email: data.email };
            return {
                  access_token: this.jwtService.sign(payload, {secret : process.env.JWT_SECRET}),
                  email: data.email,
                };    
        }     
         return {error:'wrong email or pass'};       
      }
}
