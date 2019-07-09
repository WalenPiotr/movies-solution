import { OMDBError } from '../movie/movie.entity';

export class APIError extends Error {
  constructor(err: OMDBError) {
    super(err.Error);
    Object.setPrototypeOf(this, APIError.prototype);
  }
}
