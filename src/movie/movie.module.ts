import { Module } from '@nestjs/common';
import { MoviesController } from './movie.controller';
import { MoviesService } from './movie.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
