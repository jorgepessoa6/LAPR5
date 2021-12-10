import { NextFunction, Request, Response } from 'express';

export default interface ILineController {
  createLine(req: Request, res: Response, next: NextFunction);
  listByName(res: Response, next: NextFunction);
  listByCode(res: Response, next: NextFunction);
  filterByName(req: Request, res: Response, next: NextFunction);
  filterByCode(req: Request, res: Response, next: NextFunction);
}
