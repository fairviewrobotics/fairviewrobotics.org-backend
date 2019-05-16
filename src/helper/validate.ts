import joi, { Schema } from 'joi';
import boom from 'boom';
import { Request, Response, NextFunction } from 'express';

export default (joiSchema: Schema) => (req: Request, res: Response, next: NextFunction) => 
  joi.validate(req.body, joiSchema, (error, value) => {
    if (error) {
      console.error(error);
      return next(boom.badData('Validation Failed.', { validation: error.details }))
    }
    req.validatedBody = value;
    return next();
  });