import { Service, Inject } from 'typedi';


import IRoleService from './IServices/IRoleService';
import { Result } from "../core/logic/Result";
import { RoleMap } from "../mappers/RoleMap";
import config from '../config';
import IRoleDTO from '../dto/Role/IRoleDTO';
import { Role } from '../models/role';
import IRoleRepo from '../repo/IRepo/IRoleRepo';

@Service()
export default class RoleService implements IRoleService {
  constructor(
      @Inject(config.repos.role.name) private roleRepo : IRoleRepo
  ) {}

  public async createRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>> {
    try {

      const roleOrError = await Role.create( roleDTO );

      if (roleOrError.isFailure) {
        return Result.fail<IRoleDTO>(roleOrError.errorValue());
      }

      const roleResult = roleOrError.getValue();

      await this.roleRepo.save(roleResult);

      const roleDTOResult = RoleMap.toDTO( roleResult ) as IRoleDTO;
      return Result.ok<IRoleDTO>( roleDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>> {
    try {
      const role = await this.roleRepo.findByDomainId(roleDTO.id);

      if (role === null) {
        return Result.fail<IRoleDTO>("Role not found");
      }
      else {
        role.name = roleDTO.name;
        await this.roleRepo.save(role);

        const roleDTOResult = RoleMap.toDTO( role ) as IRoleDTO;
        return Result.ok<IRoleDTO>( roleDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}
