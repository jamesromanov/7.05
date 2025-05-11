import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { Model } from 'mongoose';
import { Response } from 'express';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    private redisService: RedisService,
  ) {}
  async create(createBookDto: CreateBookDto) {
    await this.redisService.delete('book:all');
    try {
      const book = await this.bookModel.create(createBookDto);
      return book;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const booksAll = await this.redisService.get('book:all');
      console.log(JSON.parse(booksAll!));
      if (booksAll) return JSON.parse(booksAll);
      const books = await this.bookModel.find();
      await this.redisService.set('book:all', books, 1800);
      return books;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const book = await this.bookModel.findById(id);
      if (!book) throw new NotFoundException('Book not found!');
      return book;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      await this.redisService.delete('book:all');

      const book = await this.bookModel.findById(id);
      if (!book) throw new NotFoundException('Book not found!');
      book.title = updateBookDto.title || book.title;
      book.author = updateBookDto.author || book.author;
      book.published_date = updateBookDto.published_date || book.published_date;
      book.pages = updateBookDto.pages || book.pages;
      book.genres = updateBookDto.genres || book.genres;

      await book.save();
      return book;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string, res: Response) {
    await this.redisService.delete('book:all');

    try {
      const book = await this.bookModel.findById(id);
      if (!book) throw new NotFoundException('Book not found!');
      await this.bookModel.deleteOne({ id });
      return res.status(204).json(null);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
