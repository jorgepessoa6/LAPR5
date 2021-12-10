
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Entity } from "../core/domain/Entity";

export class PathNodeID extends Entity<any> {

  get id(): UniqueEntityID {
    return this._id;
  }

  public static create(id?: UniqueEntityID): PathNodeID {
    return new PathNodeID(id);
  }
}