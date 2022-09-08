import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  _id?: string;

  @Prop({ required: true, minlength: [4, 'Username is too short'] })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: [true, 'Password is missing'],
    minlength: [8, 'Password is too short'],
  })
  password: string;

  @Prop()
  createdBy?: string;

  @Prop()
  updatedBy?: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
