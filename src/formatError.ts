import { HttpException, HttpStatus } from '@nestjs/common';
import { APIError } from './errors/APIError';
import { ValidationError } from 'class-validator';

export const formatError = (err: any): HttpException => {
  if (err instanceof APIError) {
    return new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        message: 'OMDB Error',
        errors: [err],
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  if (err[0] instanceof ValidationError) {
    return new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        message: 'Argument Validation Error',
        errors: err,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  return new HttpException(
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unexpected error',
      errors: err,
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
