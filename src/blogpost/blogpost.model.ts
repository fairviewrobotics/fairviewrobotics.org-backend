import { Typegoose, prop } from 'typegoose';

class BlogPost extends Typegoose {
  @prop({ required: true })
  name: string = '';

  @prop({ required: true })
  markdown: string = '';
}

export default new BlogPost().getModelForClass(BlogPost, { schemaOptions: { timestamps: true } });