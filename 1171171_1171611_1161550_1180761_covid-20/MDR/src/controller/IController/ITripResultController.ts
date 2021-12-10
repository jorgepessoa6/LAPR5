import { Request, Response, NextFunction } from 'express';

export default interface ITripResultController  {
  createResult(req: Request, res: Response, next: NextFunction);
  listarTripResults(res: Response, next: NextFunction);
}