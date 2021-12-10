import { Request, Response, NextFunction } from 'express';

export default interface IDriverController  {
  createDriver(req: Request, res: Response, next: NextFunction);
  /* updateDriver(req: Request, res: Response, next: NextFunction); */
  listByName(res: Response, next: NextFunction);
}