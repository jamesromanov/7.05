import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    type: 'string',
    description: 'The title of the post!',
    example: 'Simple post',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    type: 'string',
    description: 'Subject of the post!',
    example: 'someething meant to be here!',
  })
  @IsString()
  @IsOptional()
  subject: string;
  @ApiProperty({
    type: 'string',
    description: 'Content of the post!',
    example: 'something interesting thing about this post!',
  })
  @IsString()
  @IsOptional()
  content: string;
}
