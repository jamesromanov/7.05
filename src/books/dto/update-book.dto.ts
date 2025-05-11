import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BookGenres } from '../genres.enum';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({
    type: 'string',
    description: 'Title of the Book!',
    example: 'Some good Book!',
  })
  @IsString()
  @IsOptional()
  title: string;
  @ApiProperty({
    type: 'string',
    description: 'Author of the book!',
    example: '1',
  })
  @IsString()
  @IsOptional()
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
  @IsOptional()
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
