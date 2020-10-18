import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { ProfileRepository } from './profile.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserProfileDto } from './dto/createUserProfile.dto';
import { SuccessDto } from '../shared/dto/success.dto';
import { IUser } from './interfaces/user.interface';
import { IUserProfile } from './interfaces/userProfile.interface';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private userDB: UserRepository,
    private profileDB: ProfileRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUser: CreateUserDto): Promise<SuccessDto> {
    const userByEmail = await this.userDB.findUserByEmail(createUser.email);
    if (userByEmail && userByEmail.role === createUser.role) {
      throw new HttpException(
        'User with this email address already exists',
        HttpStatus.CONFLICT,
      );
    }
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
      email: user.email,
    };
    const token = await this.jwtService.sign(tokenPayload, {
      expiresIn: expiresIn,
      secret: process.env.SECRET,
    });
    this.sendMail(token, user);
  }
  Ш;
  async updateMail(email: string): Promise<SuccessDto> {
    const user = await this.userDB.findUserByEmail(email);    
    if (user.status === 'created') {
      await this.sendConfirmation(user);
      return { success: true };
    }
    throw new HttpException(
      'User with this email not found',
      HttpStatus.CONFLICT,
    );
  }

  async confirmUser(token: string): Promise<any> {
    const decoded = await this.jwtService.decode(token, { json: true });
    const user = await this.userDB.findUserById(decoded['_id']);
    const isProfile = await this.profileDB.findProfileByUserId(decoded['_id']);
    if (
      user.status === 'created' &&
      moment(new Date(decoded['exp'] * 1000)).isAfter(Date.now())
    ) {
      this.logger.log(`confirm ${user.email} user`);
      return {
        isProfile: isProfile ? true : false,
        isTokenValid: true,
        userId: decoded['_id'],
      };
    }
    this.logger.log(`wrong confirm token`);
    return {
      isProfile: isProfile ? true : false,
      isTokenValid: false,
      userId: '',
    };
  }

  async addInfo(profile: CreateUserProfileDto): Promise<CreateUserProfileDto> {
    const user = await this.userDB.findUserById(profile.userId);
    const findProfile = await this.profileDB.findProfileByUserId(user._id);
    if (findProfile) {
      throw new HttpException(
        'Profile with this email address already exists',
        HttpStatus.CONFLICT,
      );
    }
    const newProfile = await this.profileDB.createProfile(profile);
    await this.userDB.updateStatus(profile.userId, 'Confirmed');
    this.logger.log(`add profile for ${user.email}`);
    return newProfile;
  }

  async sendMail(token: string, user: IUser): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: `${process.env.SEND_MAIL}`, // generated ethereal user
        pass: `${process.env.SEND_MAIL_PASSWORD}`, // generated ethereal password
      },
    });
    await transporter.sendMail({
      to: `${user.email}`, // list of receivers
      subject: 'Сomplete registration', // Subject line
      text: 'Сomplete registration', // plain text body
      html: `Сomplete registration by clicking on the link : </br>${process.env.FRONT_URL}/confirm/${token}`, // html body
    });
    this.logger.log(`send confirmation email to ${user.email}`);
  }

  async renameFile(file,data):Promise<void>{
    console.log(file);
   const name = path.extname(file.filename);
   fs.rename(file.path,`./upload/${data.id}${name}`,(err) => {
    if (err) throw err;   
  })
   console.log(name);
  return
  }

}
