
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { ValueObject } from "../core/domain/ValueObject";

export class LineID extends ValueObject<any> {

  get id (): UniqueEntityID {
    return this.id;
  }

  private constructor (id?: UniqueEntityID) {
    super(id)
  }

  public static create (id?: UniqueEntityID): LineID {
    return new LineID(id);
  }
}