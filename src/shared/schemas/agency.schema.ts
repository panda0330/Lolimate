import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/domain/user/user.schema';
import * as mongoose from 'mongoose';

export type AgencyDocument = HydratedDocument<Agency>;

@Schema()
export class Agency {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  owner: User;

  @Prop({
    default: 0,
  })
  coins: number;

  @Prop({ required: false })
  banner: string;

  @Prop()
  whatsapp: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  hosts: User[];
}

export const AgencySchema = SchemaFactory.createForClass(Agency);
