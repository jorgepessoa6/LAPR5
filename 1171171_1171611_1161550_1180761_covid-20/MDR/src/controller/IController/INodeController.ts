import { Request, Response, NextFunction } from 'express';

export default interface INodeController  {
  createNode(req: Request, res: Response, next: NextFunction);
  /* updateNode(req: Request, res: Response, next: NextFunction); */
  listByName(res: Response, next: NextFunction);
  listByCode(res: Response, next: NextFunction);
  filterByName(req: Request,res: Response, next: NextFunction);
  filterByCode(req: Request,res: Response, next: NextFunction);
  

}