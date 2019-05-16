import { prop, Typegoose } from 'typegoose';

class User extends Typegoose {
  @prop({ required: true, unique: true })
  username = '';
  
  @prop({ required: true })
  password = '';
  
  @prop({ required: true, unique: true })
  email = '';
}

export default new User().getModelForClass(User, { schemaOptions: { timestamps: true } });