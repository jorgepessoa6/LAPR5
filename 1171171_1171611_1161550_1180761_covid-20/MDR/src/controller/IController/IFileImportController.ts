import { Request, Response, NextFunction } from 'express';

export default interface IFileImportController  {
    importFile(req: any, res: Response, next: NextFunction)
  /* updateDriver(req: Request, res: Response, next: NextFunction); */
}