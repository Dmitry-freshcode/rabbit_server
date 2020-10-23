import {
    Injectable,  
  } from '@nestjs/common';
import { IUser } from 'src/user/interfaces/user.interface';
import * as nodemailer from 'nodemailer';



  @Injectable()
export class MailService {
  constructor() {}

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
    const link = `${process.env.FRONT_URL}/confirmUser/${token}`;
    await transporter.sendMail({
      to: `${user.email}`, // list of receivers
      subject: 'Complete registration', // Subject line
      text: 'Complete registration', // plain text body
      html: `Complete registration by clicking on the link : </br>, ${link}`// html body
    });   
    console.log(link);
  }

}