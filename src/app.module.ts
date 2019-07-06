import { Module } from '@nestjs/common';
import { MoviesModule } from './movie/movie.module';
@Module({
  imports: [MoviesModule],
})
export class AppModule {}
