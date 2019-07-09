import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), ConfigModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
