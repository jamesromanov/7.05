import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private redisService: RedisService,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const newPost = await this.postModel.create(createPostDto);
    await this.redisService.delete('posts:all');
    return newPost;
  }

  async findAll() {
    try {
      const data = await this.redisService.get('posts:all');
      if (data) return JSON.parse(data);
    } catch (error) {
      console.warn("Couldn't cache the data falling back to db!");
    }
    const posts = await this.postModel.find();
    try {
      await this.redisService.set('posts:all', posts, 1800);
    } catch (error) {
      console.warn('Couldnt cache the data!');
    }
    return posts;
  }
}
