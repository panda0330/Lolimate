import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AgencyDocument = HydratedDocument<Level>;

@Schema()
export class Level {
  @Prop()
  levelNumber: string;

  @Prop()
  topUp: number;

  @Prop()
  topDown: number;
}

export const LevelSchema = SchemaFactory.createForClass(Level);
