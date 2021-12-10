import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';


import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Role } from "../models/role";
import IRoleDTO from "../dto/Role/IRoleDTO";

export class RoleMap extends Mapper<Role> {
  
  public static toDTO( role: Role): IRoleDTO {
    return {
      id: role.id.toString(),
      name: role.name,
    } as IRoleDTO;
  }

  public static toDomain (role: any | Model<IRolePersistence & Document> ): Role {
    const roleOrError = Role.create(
      role,
      new UniqueEntityID(role.domainId)
    );

    roleOrError.isFailure ? console.log(roleOrError.error) : '';

    return roleOrError.isSuccess ? roleOrError.getValue() : null;
  }

  public static toPersistence (role: Role): any {
    return {
      domainId: role.id.toString(),
      name: role.name
    }
  }
}