import { Module } from '@nestjs/common';
import { MoviesModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), MoviesModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
