
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Entity } from "../core/domain/Entity";
import { ValueObject } from "../core/domain/ValueObject";

export class NodeID extends Entity<any> {

  get id(): UniqueEntityID {
    return this._id;
  }

   public static create(id?: UniqueEntityID): NodeID {
    return new NodeID(id);
  } 
/*   private constructor (id?: UniqueEntityID) {
    super(null, id)
  } */
}