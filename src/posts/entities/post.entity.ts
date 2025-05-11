import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Post {
  @Prop()
  title: string;
  @Prop()
  subject: string;
  @Prop()
  content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
