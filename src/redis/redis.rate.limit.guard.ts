import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RedisService } from './redis.service';
@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(private readonly redisService: RedisService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userIp = request.ip;

    const isLimited = await this.redisService.isRateLimited(userIp);
    if (isLimited) throw new ForbiddenException('Rate limit exceeded');
    return true;
  }
}
