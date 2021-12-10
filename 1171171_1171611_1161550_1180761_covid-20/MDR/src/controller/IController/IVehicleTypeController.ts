import { Request, Response, NextFunction } from 'express';

export default interface IVehicleTypeController  {
  createVehicleType(req: Request, res: Response, next: NextFunction);
  /* updateTripulante(req: Request, res: Response, next: NextFunction); */
  listByName(res: Response, next: NextFunction);
}