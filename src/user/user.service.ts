import { Injectable ,HttpException,HttpStatus,UnauthorizedException} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';


@Injectable()
export class UserService {
    constructor(  
      private userDB:UserRepository,
    ) {}
  
    async create(createUserDto: CreateUserDto): Promise<object> { 
      try{
        const isExist = await this.userDB.findUser({ email: createUserDto.email });           
        if (!isExist){        
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(createUserDto.password, salt);   
            const createdUser = _.assign(createUserDto, { password: hash });          
            this.userDB.create(createdUser);
            return {statusCode: 201, message: "user created"};
        }else{
          throw new UnauthorizedException({status:'user is Exist'});           
        }
      }catch{      
        throw new HttpException('user is Exist', HttpStatus.BAD_REQUEST);
      }    
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
