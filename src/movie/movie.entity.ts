import { Transform } from 'class-transformer';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { Rating } from '../rating/rating.entity';

class ResponsePartial {
  @Transform(value => Boolean(value), { toClassOnly: true })
  Response: boolean;
}

export class OMDBMovie extends ResponsePartial {
  @Column()
  Title?: string;

  @Column()
  Year?: string;

  @Column()
  Rated?: string;

  @Column()
  Released?: string;

  @Column()
  Runtime?: string;

  @Column()
  Genre?: string;

  @Column()
  Director?: string;

  @Column()
  Writer?: string;

  @Column()
  Actors?: string;

  @Column()
  Plot?: string;

  @Column()
  Language?: string;

  @Column()
  Country?: string;

  @Column()
  Awards?: string;

  @Column()
  Poster?: string;

  @OneToMany(type => Rating, rating => rating.movie)
  Ratings?: Rating[];

  @Column()
  Metascore?: string;

  @Column()
  imdbRating?: string;

  @Column()
  imdbVotes?: string;

  @PrimaryColumn()
  imdbID?: string;

  @Column()
  Type?: string;

  @Column()
  DVD?: string;

  @Column()
  BoxOffice?: string;

  @Column()
  Production?: string;

  @Column()
  Website?: string;
}

export class OMDBError extends ResponsePartial {
  Error: string;
}

export type OMDBPayload = Partial<OMDBError> & Partial<OMDBMovie>;

@Entity()
export class Movie extends OMDBMovie {
  // @PrimaryGeneratedColumn()
  // id: number;

  @OneToMany(type => Comment, comment => comment.movie)
  comments?: Comment[];
}
