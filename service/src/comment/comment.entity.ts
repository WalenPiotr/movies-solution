import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from '../movie/movie.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  title: string;

  @ManyToOne(type => Movie, user => user.comments)
  movie: Movie;
}
