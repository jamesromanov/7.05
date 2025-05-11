import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BookGenres } from '../genres.enum';

@Schema()
export class Book {
  @Prop()
  title: string;
  @Prop()
  author: string;
  @Prop()
  published_date: Date;
  @Prop()
  pages: number;
  @Prop()
  genres: BookGenres;
}

export const BookSchema = SchemaFactory.createForClass(Book);

// title (String, majburiy)

// author (String, majburiy)

// publishedDate (Date, optional)

// pages (Number)

// genres (Array of String)
