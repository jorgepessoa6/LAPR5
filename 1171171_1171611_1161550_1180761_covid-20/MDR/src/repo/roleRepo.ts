import { Service, Inject } from 'typedi';


import { RoleMap } from "../mappers/RoleMap";

import { Document, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';
import IRoleRepo from './IRepo/IRoleRepo';
import { RoleId } from '../models/roleId';
import { Role } from '../models/role';

@Service()
export default class RoleRepo implements IRoleRepo {
  private models: any;

  constructor(
    @Inject('roleSchema') private roleSchema : Model<IRolePersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (roleId: RoleId | string): Promise<boolean> {

    const idX = roleId instanceof RoleId ? (<RoleId>roleId).id.toValue() : roleId;

    const query = { domainId: idX}; 
    const roleDocument = await this.roleSchema.findOne( query );

    return !!roleDocument === true;
  }

  public async save (role: Role): Promise<Role> {
    const query = { domainId: role.id.toString()}; 

    const roleDocument = await this.roleSchema.findOne( query );

    try {
      if (roleDocument === null ) {
        const rawRole: any = RoleMap.toPersistence(role);

        const roleCreated = await this.roleSchema.create(rawRole);

        return RoleMap.toDomain(roleCreated);
      } else {
        roleDocument.name = role.name;
        await roleDocument.save();

        return role;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (roleId: RoleId | string): Promise<Role> {
    const query = { domainId: roleId};
    const roleRecord = await this.roleSchema.findOne( query );

    if( roleRecord != null) {
      return RoleMap.toDomain(roleRecord);
    }
    else
      return null;
  }
}