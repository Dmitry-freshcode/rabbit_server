import { Injectable ,HttpException,HttpStatus,UnauthorizedException} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserProfileDto } from './dto/createUserProfile.dto'
import { SuccessDto } from './dto/success.dto';
import { IUser } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';


@Injectable()
export class UserService {
    constructor(  
     private userDB:UserRepository,
    ) {}
  
    async register(createUser: CreateUserDto, profile:CreateUserProfileDto): Promise<SuccessDto> { 
        if (!createUser.password){
          throw new HttpException('Password must not be empty', HttpStatus.CONFLICT);
        }     
        const userByEmail = await this.userDB.findUser({ email: createUser.email });
        if (userByEmail) {
          throw new HttpException('User with this email address already exists', HttpStatus.CONFLICT);
        };              
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(createUser.password, salt);   
        const createdUser = _.assign(createUser, { password: hash });          
        this.userDB.createUser(createdUser,profile);       
        return { success: true };       
    }
  
  
  
    async findOne(data:CreateUserDto): Promise<IUser | undefined> {   
      try{    
        return this.userDB.findUser({ email: data.email });
      } catch{
        throw new HttpException('BAD_REQUEST : users.findOne', HttpStatus.BAD_REQUEST);
      }    
    }
  
    async getProfile(email: string): Promise<Object | undefined>{
      const user = await this.userDB.findUser({email:email});
      return {
        email: user.email,
        _id:user._id
      }
    }
  
  
  }
