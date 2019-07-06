import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Movie } from '../movie.entity';

@Entity()
export class Rating extends BaseEntity {
  @Column()
  source: string;

  @Column()
  value: string;

  @ManyToOne(type => Movie, movie => movie.Ratings)
  movie: Movie;
}
