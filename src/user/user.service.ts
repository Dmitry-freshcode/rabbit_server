import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { ProfileRepository } from './profile.repository';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserProfileDto } from './dto/createUserProfile.dto';
import { AuthorizationDto } from './dto/authorization.dto';
import { ProfileDto } from './dto/profile.dto';
import { SuccessDto } from '../shared/dto/success.dto';
import { IUser } from './interfaces/user.interface';
import { IUserProfile } from './interfaces/userProfile.interface';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { AuthModule } from 'src/auth/auth.module';
import { MailService } from 'src/utils/mail';
import { CryptoService } from 'src/utils/crypto';
import { LocationRepository } from './location.repository';
import { FilesService } from 'src/utils/files';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private userDB: UserRepository,
    private locationDB: LocationRepository,
    private profileDB: ProfileRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly cryptoService: CryptoService,
    private readonly fileService: FilesService,
  ) {}

  errorRes(value, msg: string): void {
    if (value) {
      throw new HttpException(msg, HttpStatus.CONFLICT);
    }
  }

  async registerLocal(createUser: CreateUserDto): Promise<SuccessDto> {
    const userByEmail = await this.userDB.findUserByEmail(createUser.email);
    this.errorRes(userByEmail, 'User with this email address already exists');
    this.errorRes(!createUser.password, 'Password is empty');
    const hash = await this.cryptoService.passHash(createUser.password);
    const user = _.assign(createUser, { password: hash });
    const newUser = await this.registerUser(user);
    this.sendConfirmation(newUser);
    return { success: true };
  }

  async registerUser(createUser: CreateUserDto): Promise<IUser> {
    const newUser = await this.userDB.createUser(createUser);
    this.logger.log(`User with email ${newUser.email} created`);
    return newUser;
  }

  async sendConfirmation(user: IUser): Promise<void> {
    const mailToken = await this.cryptoService.getMailToken(user._id);
    this.mailService.sendMail(mailToken, user);
  }

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

  // async confirmUser(token: string): Promise<any> {
  //   const decoded = await this.jwtService.decode(token, { json: true });
  //   const user = await this.userDB.findUserById(decoded['_id']);
  //   const isProfile = await this.profileDB.findProfileByUserId(decoded['_id']);
  //   if (
  //     user.status === 'created' &&
  //     moment(new Date(decoded['exp'] * 1000)).isAfter(Date.now())
  //   ) {
  //     this.logger.log(`confirm ${user.email} user`);
  //     return {
  //       isProfile: isProfile ? true : false,
  //       isTokenValid: true,
  //       userId: decoded['_id'],
  //     };
  //   }
  //   this.logger.log(`wrong confirm token`);
  //   return {
  //     isProfile: isProfile ? true : false,
  //     isTokenValid: false,
  //     userId: '',
  //   };
  // }

  async addInfo(
    profile: ProfileDto,
    token: string,
    filename: string,
  ): Promise<any> {
    const decoded = await this.cryptoService.decodeToken(token);
    const findUser = await this.userDB.findUserById(decoded.id);
    if (!findUser) {
      this.fileService.removeAvatar(filename);
      throw new HttpException(
        'User with this email address not found',
        HttpStatus.CONFLICT,
      );
    }
    const findProfile = await this.profileDB.findProfileByUserId(findUser._id);
    if (findProfile) {
      this.fileService.removeAvatar(filename);
      throw new HttpException(
        'Profile with this email address already exists',
        HttpStatus.CONFLICT,
      );
    }

    const userAvatar = path.join(process.env.APP_URL, 'user/image/' + filename);
    const creatProfile = { ...profile, userAvatar, userId: findUser._id };
    await this.profileDB.createProfile(creatProfile);
    await this.userDB.updateById(findUser._id, {
      status: 'confirmed',
      role: profile.role,
    });
    this.logger.log(`add profile for ${findUser.email}`);
    const db = await this.userDB.getUserState(findUser._id);
    console.log(db);
    return db[0];
    //return {...newProfile};
  }

  // async sendMail(token: Promise<string>, user: IUser): Promise<void> {
  //   const transporter = nodemailer.createTransport({
  //     host: 'smtp.gmail.com',
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: `${process.env.SEND_MAIL}`, // generated ethereal user
  //       pass: `${process.env.SEND_MAIL_PASSWORD}`, // generated ethereal password
  //     },
  //   });
  //   const link = `${process.env.FRONT_URL}/confirmUser/${token}`;
  //   await transporter.sendMail({
  //     to: `${user.email}`, // list of receivers
  //     subject: 'Complete registration', // Subject line
  //     text: 'Complete registration', // plain text body
  //     html: `Complete registration by clicking on the link : </br>, ${link}`// html body
  //   });
  //   this.logger.log(`send confirmation email to ${user.email}`);
  //   console.log(link);
  // }

  async renameFile(file, data): Promise<void> {
    console.log(file);
    const name = path.extname(file.filename);
    fs.rename(file.path, `./upload/${data.id}${name}`, err => {
      if (err) throw err;
    });
    console.log(name);
    return;
  }
}
