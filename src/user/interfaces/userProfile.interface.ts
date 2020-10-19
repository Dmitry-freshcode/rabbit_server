import { Document } from 'mongoose';

export interface IUserProfile extends Document {
  readonly lastName: string;
  readonly firstName: string;
  readonly middleName: string;
  readonly birthday: Date;
  readonly city: string;
  readonly state: string;
  readonly userId: string;
  readonly isOnline: boolean;
  readonly userAvatar: string;
}
