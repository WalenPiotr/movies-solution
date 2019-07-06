import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, MovieModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
