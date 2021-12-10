import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import IRoleDTO from "../dto/Role/IRoleDTO";
import { RoleId } from "./roleId";



interface RoleProps {
  name: string;
}

export class Role extends AggregateRoot<RoleProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get roleId (): RoleId {
    return RoleId.create(this.id);
  }

  get name (): string {
    return this.props.name;
  }

  set name ( value: string) {
    this.props.name = value;
  }
  private constructor (props: RoleProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (roleDTO: IRoleDTO, id?: UniqueEntityID): Result<Role> {
    const name = roleDTO.name;

    if (!!name === false || name.length === 0) {
      return Result.fail<Role>('Must provide a role name')
    } else {
      const role = new Role({ name: name }, id);
      return Result.ok<Role>( role )
    }
  }
}
