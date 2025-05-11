import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;
  async onModuleInit() {
    if (!process.env.REDIS_PORT || !process.env.REDIS_HOST)
      throw new NotFoundException('Couldnt read env variables!');
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    });

    this.client.on('connect', () => {
      console.log('Connected to redis!');
    });
    this.client.on('error', (err) => {
      console.log('Error while connecting to redis:', err);
    });
  }
  async set(key: string, value: any, expire?: number) {
    if (expire)
      return this.client.set(key, JSON.stringify(value), 'EX', expire);
    else return this.client.set(key, JSON.stringify(value));
  }
  async get(key: string) {
    return this.client.get(key);
  }
  async delete(key: string) {
    return this.client.del(key);
  }
  async isRateLimited(userIp: string): Promise<boolean> {
    const key = `rate_limit:${userIp}`;
    const max_requests = 5;
    const time = 60;

    const count = await this.client.incr(key);

    if (count === 1) await this.client.expire(key, time);

    if (count > max_requests) return true;
    return false;
  }
}
