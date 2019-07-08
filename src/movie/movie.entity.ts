import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Rating } from '../rating/rating.entity';
import { Transform, Type } from 'class-transformer';
import * as moment from 'moment';
import { Comment } from '../comment/comment.entity';
import { ValidateNested } from 'class-validator';

class ResponsePartial {
  @Transform(value => Boolean(value), { toClassOnly: true })
  Response: boolean;
}

export class OMDBMovie extends ResponsePartial {
  @Column()
  Title?: string;

  @Column()
  @Type(() => Number)
  @Transform(value => parseInt(value, 10), { toClassOnly: true })
  Year?: number;

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
  imdbID: string;

  @Column()
  Type: string;

  @Column()
  @Type(() => Date)
  @Transform(value => moment(value), { toClassOnly: true })
  DVD: Date;

  @Column()
  BoxOffice: string;

  @Column()
  Production: string;

  @Column()
  Website: string;
}

export class OMDBError extends ResponsePartial {
  Error: string;
}

export type OMDBPayload = Partial<OMDBError> & Partial<OMDBMovie>;

@Entity()
export class Movie extends OMDBMovie {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Comment, comment => comment.movie)
  comments: Comment;
}
