import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from '../movie/movie.entity';

@Entity()
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Source?: string;

  @Column()
  Value?: string;

  @ManyToOne(type => Movie, movie => movie.Ratings)
  movie?: Movie;
}
