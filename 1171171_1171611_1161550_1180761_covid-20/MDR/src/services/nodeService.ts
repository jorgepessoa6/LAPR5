import { Service, Inject, Container } from 'typedi';
import nodeDTO from "../dto/Node/nodeDTO";

import {NodeMapper} from '../mappers/nodeMapper';
import { Result } from '../core/logic/Result';
import  INodeDTO  from '../dto/Node/nodeDTO';
import { Node } from '../models/node';
import config from '../config';
import INodeService from './IServices/INodeService';
import INodeRepo from '../repo/IRepo/INodeRepo';


@Service()
export default class NodeService implements INodeService {
    constructor(
        @Inject(config.repos.node.name) private nodeRepo: INodeRepo
    ) { }

    public async createNode(nodeDTO: nodeDTO): Promise<Result<INodeDTO>> {
        try {
            const nodeOrError = await Node.create(nodeDTO);
            if (nodeOrError.isFailure) {
                return Result.fail<INodeDTO>(nodeOrError.errorValue());
            }
            const nodeResult = nodeOrError.getValue();
            await this.nodeRepo.save(nodeResult);
            const nodeDTOResult = NodeMapper.toDTO(nodeResult) as INodeDTO;
            return Result.ok<INodeDTO>(nodeDTOResult);

        } catch (e) {
            throw e;
        }
    }
    public async listByName(): Promise<Node[]> {
        try {
           const nodes = await this.nodeRepo.listByName();
            return nodes;
           //return Result.ok<string[]>(nodes);
        } catch (e) {
            throw e;
        }
    }
    public async listByCode(): Promise<Node[]> {
        try {
           const nodes = await this.nodeRepo.listByCode();
            return nodes;
           //return Result.ok<string[]>(nodes);
        } catch (e) {
            throw e;
        }
    }

    public async filterByName(key:string): Promise<Node[]> {
        try {
           const nodes = await this.nodeRepo.filterByName(key);
            return nodes;
           //return Result.ok<string[]>(nodes);
        } catch (e) {
            throw e;
        }
    }
    public async filterCode(key:string): Promise<Node[]> {
        try {
           const nodes = await this.nodeRepo.filterCode(key);
            return nodes;
           //return Result.ok<string[]>(nodes);
        } catch (e) {
            throw e;
        }
    }


}
