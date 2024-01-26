import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type Gender = 'male' | 'female';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {
  _id: string;

  @Prop()
  nickname: string;

  @Prop()
  age: number;

  @Prop({ default: '' })
  selfIntroduction: string;

  @Prop()
  gender: Gender;

  @Prop({ default: 0 })
  coins: number = 0;

  @Prop({ default: false })
  isHost: boolean;

  @Prop()
  isReseller: boolean;

  @Prop({ default: '' })
  region: string;

  @Prop({ default: '' })
  country: string;

  @Prop()
  typeOfLogin: string;

  @Prop()
  credentials: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }],
    required: false,
  })
  followers: User[];

  @Prop({ default: false })
  isAgencyOwner: boolean;

  @Prop({ default: '' })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
