import { Request, Response, NextFunction } from 'express';
import {  Inject  } from 'typedi';
import INodeDTO from '../dto/Node/nodeDTO';
import { Result } from '../core/logic/Result';
import config from '../config';
import INodeController from './IController/INodeController';
import INodeService from '../services/IServices/INodeService';


export default class NodeController implements INodeController {
    constructor(
        
        @Inject(config.services.node.name) private nodeServiceInstance: INodeService
    ) {}

    public async createNode(req: Request, res: Response, next: NextFunction) {
        try {
            const nodeOrError = await this.nodeServiceInstance.createNode(req.body as INodeDTO) as Result<INodeDTO>;
            if (nodeOrError.isFailure) {
                return res.status(402).send();
            }
            const nodeDTO = nodeOrError.getValue();
            return res.status(201).json(nodeDTO);

        } catch (e) {
            return next(e);
        }
    }
    public async listByName(res: Response, next: NextFunction) {
        try {
            await this.nodeServiceInstance.listByName().then(value=>{
                res.status(200).send(value);
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            return next(e);
        }
    }
    public async listByCode(res: Response, next: NextFunction) {
        try {
            await this.nodeServiceInstance.listByCode().then(value=>{
                res.status(200).send(value);
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            return next(e);
        }
    }
    public async filterByName(req: Request,res: Response, next: NextFunction) {
        try {
            const key= req.params.name;
            console.log(key);
            await this.nodeServiceInstance.filterByName(key).then(value=>{
                res.status(200).send(value);
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            return next(e);
        }
    }
    public async filterByCode(req: Request,res: Response, next: NextFunction) {
        try {
            const key= req.params.key;
            await this.nodeServiceInstance.filterCode(key).then(value=>{
                res.status(200).send(value);
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            return next(e);
        }
    }

}
