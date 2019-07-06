import { Entity, Column, ManyToOne } from 'typeorm';
import { Movie } from '../movie/movie.entity';

@Entity()
export class Comment {
  @Column()
  text: string;
  
  @Column()
  title: string;

  @ManyToOne(type => Movie, user => user.comments)
  movie: Movie;
}
