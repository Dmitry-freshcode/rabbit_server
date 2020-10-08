import { Injectable ,HttpException,HttpStatus,Logger} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserProfileDto } from './dto/createUserProfile.dto';
import { SuccessDto } from './dto/success.dto';
import { IUser } from './interfaces/user.interface';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';



@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
    constructor(  
     private userDB:UserRepository,
     private readonly jwtService: JwtService,
    ) {}
  
    async register(createUser: CreateUserDto): Promise<SuccessDto> {             
        const userByEmail = await this.userDB.findUserByEmail(createUser);
        if (userByEmail) {
          throw new HttpException('User with this email address already exists', HttpStatus.CONFLICT);
        };              
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(createUser.password, salt);   
        const user = _.assign(createUser, { password: hash });          
        const newUser = await this.userDB.createUser(user);
        this.sendConfirmation(newUser); 
        this.logger.log(`user with email ${user.email} created`);      
        return { success: true };       
    }

    async sendConfirmation(user: IUser): Promise<void> {      
      const expiresIn = 60 * 60 * 24;
      const tokenPayload = {
        _id: user._id,
        email:user.email,
        status: user.isActive       
      };  
      const token = await this.jwtService.sign(tokenPayload, { expiresIn:expiresIn,secret:'dfdfg' });      
      this.userDB.createRegistration(user,token);     
      this.sendMail(token,user); 
      this.logger.log(`send confirmation email to ${user.email}`);  
    }

    async confirmUser(token:string): Promise<SuccessDto>{  

      this.userDB.deleteRegistration(token);
      const encode = await this.jwtService.decode(token);
      console.log(encode);  
      //this.logger.log(`register ${user.email}`); 
      return { success: true }
    }


    async addInfo(createUser: CreateUserDto, profile:CreateUserProfileDto): Promise<SuccessDto> {
      const userByEmail = await this.userDB.findUserByEmail(createUser);
      const findProfile = await this.userDB.findProfileByUser(userByEmail);
      if(findProfile){
        throw new HttpException('Profile with this email address already exists', HttpStatus.CONFLICT);
      }
      this.userDB.createProfile(userByEmail,profile);       
      return { success: true };       
    }

    async sendMail(token:string,user:IUser):Promise<void>{     
        const transporter = nodemailer.createTransport({        
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: `${process.env.SEND_MAIL}`, // generated ethereal user
          pass: `${process.env.SEND_MAIL_PASSWORD}`, // generated ethereal password
        },
      });

      const info = await transporter.sendMail({     
        to: `${user.email}`, // list of receivers
        subject: "Сomplete registration", // Subject line
        text: "Сomplete registration", // plain text body
        html: `Сomplete registration by clicking on the link : </br>${process.env.APP_URL}/user/confirmUser?token=${token}`, // html body
      });
    };

  }
