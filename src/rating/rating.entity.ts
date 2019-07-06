import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Movie } from '../movie/movie.entity';

@Entity()
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column()
  value: string;

  @ManyToOne(type => Movie, movie => movie.Ratings)
  movie: Movie;
}
