
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Entity } from "../core/domain/Entity";
import { ValueObject } from "../core/domain/ValueObject";


export class PathID extends Entity<any> {

  get id(): UniqueEntityID {
    return this._id;
  }

  public static create(id?: UniqueEntityID): PathID {
    return new PathID(id);
  }
}