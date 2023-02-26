import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop()
  name: string;

  @Prop()
  location: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop()
  type: number;

  @Prop()
  opacity: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
