import { Transform, Type } from 'class-transformer';
import * as moment from 'moment';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  @Type(() => Number)
  @Transform(value => parseInt(value, 10), { toClassOnly: true })
  Year?: number;

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

  @Column({ type: 'float' })
  @Type(() => Number)
  @Transform(value => parseFloat(value), { toClassOnly: true })
  Metascore?: number;

  @Column({ type: 'float' })
  @Type(() => Number)
  @Transform(value => parseFloat(value), { toClassOnly: true })
  imdbRating?: number;

  @Column()
  imdbVotes?: string;

  @Column()
  imdbID?: string;

  @Column()
  Type?: string;

  @Column()
  @Type(() => Date)
  @Transform(value => moment(value), { toClassOnly: true })
  DVD?: Date;

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
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Comment, comment => comment.movie)
  comments?: Comment[];
}
