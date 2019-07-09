import { Module, HttpModule } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { ConfigModule } from '../config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Rating } from '../rating/rating.entity';

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
