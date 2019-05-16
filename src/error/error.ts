import boom from 'boom';
import { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Not Found');
}

export const error = (error: boom | any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  if (!boom.isBoom(error)) {
    error = boom.badImplementation();
  }
  return res.status((error as boom).output.statusCode).json({
    successful: false,
    message: error.message,
    data: error.data
  });
}