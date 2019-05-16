import { Request, Response, NextFunction } from 'express';

const asyncMid = (middleware: (req: Request, res: Response) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => middleware(req, res).catch(error => next(error));

export default asyncMid;