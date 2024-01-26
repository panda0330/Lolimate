import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { User } from '../user/user.schema';
@Schema()
export class Reseller {
  @Prop({ default: 0 })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: User | ObjectId | string;


  @Prop({ default: 0 })
  totalCoinsSold: number;

  @Prop()
  whatsapp: string;
}

export const ResellerSchema = SchemaFactory.createForClass(Reseller);
