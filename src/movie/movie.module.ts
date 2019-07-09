import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { Rating } from '../rating/rating.entity';
import { MovieController } from './movie.controller';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    TypeOrmModule.forFeature([Rating]),
    ConfigModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
