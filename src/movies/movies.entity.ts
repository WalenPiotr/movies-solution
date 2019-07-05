import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Rating } from './ratings/ratings.entity';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Title: string;

  @Column()
  Year: number;

  @Column()
  Rated: string;

  @Column()
  Released: string;

  @Column()
  Runtime: string;

  @Column()
  Genre: string;

  @Column()
  Director: string;

  @Column()
  Writer: string;

  @Column()
  Actors: string;

  @Column()
  Plot: string;

  @Column()
  Language: string;

  @Column()
  Country: string;

  @Column()
  Awards: string;

  @Column()
  Poster: string;

  @ManyToOne(type => Rating, rating => rating.movie)
  Ratings: Rating[];

  @Column()
  Metascore: number;

  @Column()
  imdbRating: number;

  @Column()
  imdbVotes: number;

  @Column()
  imbdID: string;

  @Column()
  Type: string;

  @Column()
  DVD: Date;

  @Column()
  BoxOffice: string;

  @Column()
  Production: string;

  @Column()
  Website: string;

  @Column()
  Response: boolean;
}
