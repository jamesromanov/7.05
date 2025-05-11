import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BookGenres } from '../genres.enum';

export class CreateBookDto {
  @ApiProperty({
    type: 'string',
    description: 'Title of the Book!',
    example: 'Some good Book!',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    type: 'string',
    description: 'Author of the book!',
    example: '1',
  })
  @IsString()
  @IsNotEmpty()
  author: string;
  @ApiProperty({
    description: 'The puplished date of the book!',
    example: '2014-11-11 12:45:34',
  })
  @IsString()
  published_date: Date;
  @ApiProperty({
    type: 'number',
    description: 'Page of the book!',
    example: 134,
  })
  @IsNumber()
  @IsNotEmpty()
  pages: number;
  @ApiProperty({
    type: 'string',
    description: 'Genre of the user!',
    example: BookGenres.drama,
  })
  @IsOptional()
  @IsEnum(BookGenres)
  genres: BookGenres;
}
