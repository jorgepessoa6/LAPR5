import { Request, Response, NextFunction } from 'express';

export default interface IPathController  {
  createPath(req: Request, res: Response, next: NextFunction);
  listAllPaths(res: Response, next: NextFunction);
  listPathsByLine(req: Request, res: Response, next: NextFunction);
  listLinePathsByLine(req: Request, res: Response, next: NextFunction);
  /* updatePath(req: Request, res: Response, next: NextFunction); */
}