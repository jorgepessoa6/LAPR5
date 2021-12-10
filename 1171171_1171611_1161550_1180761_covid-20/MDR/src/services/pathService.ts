import { Service, Inject, Container } from 'typedi';

import { PathMapper } from '../mappers/pathMapper';
import { Result } from '../core/logic/Result';
import IPathDTO from '../dto/Path/pathDTO';
import ILineDTO from '../dto/Line/lineDTO';
import { Path } from '../models/path';
import { LinePath } from '../models/linePath';
import config from '../config';
import IPathRepo from '../repo/IRepo/IPathRepo';
import ILineRepo from '../repo/IRepo/ILineRepo';

@Service()
export default class PathService {
  constructor(
    @Inject(config.repos.path.name) private pathRepo: IPathRepo,
    @Inject(config.repos.line.name) private lineRepo: ILineRepo
  ) { }

  public async createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    try {
      const roleOrError = await Path.create(pathDTO);

      if (roleOrError.isFailure) {
        return Result.fail<IPathDTO>(roleOrError.errorValue());
      }

      const pathResult = roleOrError.getValue();

      var line = await this.lineRepo.findByKey(pathDTO.idLinha);

      if (line[0] == undefined) {
        throw new Error("Linha invalida");
      }

      const linePathOrError = await LinePath.create(pathDTO);


      if (linePathOrError.isFailure) {
        return Result.fail<IPathDTO>(linePathOrError.errorValue());
      }

      const linePathResult = linePathOrError.getValue();

      if (line[0].linePath[0] == undefined) {
        line[0].linePath[0] = [];
      }

      if (line[0].linePath[0].linePath == undefined) {
        line[0].linePath[0].linePath = [];
      }

      await line[0].linePath[0].linePath.push(linePathResult);

      await this.pathRepo.save(pathResult);

      await this.lineRepo.update(line[0]);

      const roleDTOResult = PathMapper.toDTO(pathResult) as IPathDTO;
      return Result.ok<IPathDTO>(roleDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async createPathImport(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    try {
      const roleOrError = await Path.create(pathDTO);

      if (roleOrError.isFailure) {
        return Result.fail<IPathDTO>(roleOrError.errorValue());
      }

      const roleResult = roleOrError.getValue();

      await this.pathRepo.save(roleResult);

      const roleDTOResult = PathMapper.toDTO(roleResult) as IPathDTO;
      return Result.ok<IPathDTO>(roleDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async listPathsByLine(key: string): Promise<Path[]> {
    try {
      var line = await this.lineRepo.findByKey(key);

      if (line[0].name == undefined) {
        throw new Error("Linha invalida");
      }

      var paths = [];


      var linePaths = line[0].linePath[0].linePath;

      for (var i = 0; i < linePaths.length; i++) {
        if (linePaths[i].path == undefined) {
          paths.push(await this.pathRepo.findByKey(linePaths[i].props.path));
        } else {
          paths.push(await this.pathRepo.findByKey(linePaths[i].path));
        }
      }
      return paths;
    } catch (e) {
      throw e;
    }
  }

  public async listLinePathsByLine(key: string): Promise<Path[]> {
    try {
      var line = await this.lineRepo.findByKey(key);

      if (line[0].name == undefined) {
        throw new Error("Linha invalida");
      }

      var linePaths = line[0].linePath[0].linePath;

      return linePaths;
    } catch (e) {
      throw e;
    }
  }

  public async listByName(): Promise<Path[]> {
    try {
      const paths = await this.pathRepo.listByName();
      return paths;
    } catch (e) {
      throw e;
    }
  }
}