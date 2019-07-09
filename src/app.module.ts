import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CommentModule } from './comment/comment.module';
import { DatabaseModule } from './database/database.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [DatabaseModule, MovieModule, CommentModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
