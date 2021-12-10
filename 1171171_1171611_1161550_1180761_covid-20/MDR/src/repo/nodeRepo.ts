import { Service, Inject } from 'typedi';
import { NodeMapper } from '../mappers/nodeMapper';
import { Node } from '../models/node';
import INodeRepo from './IRepo/INodeRepo';
import { Document, Model } from 'mongoose';
import { NodeID } from '../models/nodeID';
import { INodePersistence } from '../dataschema/INodePersistance';


@Service()
export default class NodeRepo implements INodeRepo {
  private models: any;

  constructor(
    @Inject('Node') private nodeSchema: Model<INodePersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(nodeID: NodeID | string): Promise<boolean> {

    const idX = nodeID instanceof NodeID ? (<NodeID>nodeID).id.toValue() : nodeID;

    const query = { domainId: idX };
    const nodeDocument = await this.nodeSchema.findOne(query);

    return !!nodeDocument === true;
  }

  public async save(node: Node): Promise<Node> {
    const query = { domainId: node.id.toString() };
    const nodeDocument = await this.nodeSchema.findOne(query);
    try {
      if (nodeDocument === null) {
        const rawNode: any = NodeMapper.toPersistence(node);
        const nodeCreated = await this.nodeSchema.create(rawNode);
        console.log(nodeCreated);

        const returnNode = NodeMapper.toDomain(nodeCreated);
        console.log(returnNode);
        return returnNode;
      } else {
        nodeDocument.name = node.name;
        await nodeDocument.save();

        return node;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(nodeID: NodeID | string): Promise<Node> {
    const query = { domainId: nodeID };
    const nodeRecord = await this.nodeSchema.findOne(query);

    if (nodeRecord != null) {
      return NodeMapper.toDomain(nodeRecord);
    }
    else
      return null;
  }

  public async listByName(): Promise<Node[]> {
    return new Promise<Node[]>((resolve, reject) => {
      this.nodeSchema.aggregate([
        /*  {
           "$group":
           {
             _id: "$name",
             total: { "$sum": "$name" } 
           }
         }, */
        {
          "$sort":
            { name: 1 }
        },
      ], (error: any, result: Node[]) => {
        if (error) reject(error);
        else {
          console.log(result);
          let nodes: Node[] = [];
          result.forEach(function (element: Node) {
            nodes.push(element);
          });
          resolve(nodes);
        }
      });
    });
  }
  public async listByCode(): Promise<Node[]> {
    return new Promise<Node[]>((resolve, reject) => {
      this.nodeSchema.aggregate([
        /*  {
           "$group":
           {
             _id: "$name",
             total: { "$sum": "$name" } 
           }
         }, */
        {
          "$sort":
            { key: 1 }
        },
      ], (error: any, result: Node[]) => {
        if (error) reject(error);
        else {
          console.log(result);
          let nodes: Node[] = [];
          result.forEach(function (element: Node) {
            nodes.push(element);
          });
          resolve(nodes);
        }
      });
    });
  }
  public async filterByName(keyReq: string): Promise<Node[]> {
    console.log(keyReq);
    return new Promise<Node[]>((resolve, reject) => {
      this.nodeSchema.find(

        {name: { $regex: '^' + keyReq } }

      , (error: any, result: Node[]) => {
        if (error) reject(error);
        else {
          console.log(result);
          let nodes: Node[] = [];
          result.forEach(function (element: Node) {
            nodes.push(element);
          });
          resolve(nodes);
        }
      });
    });
  }
  public async filterCode(keyReq: string): Promise<Node[]> {
    console.log(keyReq);
    return new Promise<Node[]>((resolve, reject) => {
      this.nodeSchema.find(

        {key: { $regex: keyReq } }
      , (error: any, result: Node[]) => {
        if (error) reject(error);
        else {
          console.log(result);
          let nodes: Node[] = [];
          result.forEach(function (element: Node) {
            nodes.push(element);
          });
          resolve(nodes);
        }
      });
    });
  }
  
  
}