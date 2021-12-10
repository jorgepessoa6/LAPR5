import config from '../config';
import ILineRepo from '../repo/IRepo/ILineRepo';
import ILineService from './IServices/ILineService';
import lineDTO from '../dto/Line/lineDTO';
import { Inject, Service } from 'typedi';
import { Line } from '../models/line';
import { LineMapper } from '../mappers/lineMapper';
import { Result } from '../core/logic/Result';

@Service()
export default class LineService implements ILineService {
  constructor(@Inject(config.repos.line.name) private lineRepo: ILineRepo) {}

  public async createLine(lineDTO: lineDTO): Promise<Result<Line>> {
    try {
      const lineOrError = await Line.create(lineDTO);
      if (lineOrError.isFailure) {
        return Result.fail<Line>(lineOrError.errorValue());
      }
      const lineResult = lineOrError.getValue();

      await this.lineRepo.save(lineResult);

      const lineDTOResult = LineMapper.toDTO(lineResult) as Line;

      return Result.ok<Line>(lineDTOResult);
    } catch (e) {
      throw e;
    }
  }
  public async createLineImport(lineDTO: lineDTO): Promise<Result<Line>> {
    try {
      const lineOrError = await Line.createImport(lineDTO);
      if (lineOrError.isFailure) {
        return Result.fail<Line>(lineOrError.errorValue());
      }
      const lineResult = lineOrError.getValue();

      await this.lineRepo.save(lineResult);

      const lineDTOResult = LineMapper.toDTO(lineResult) as Line;

      return Result.ok<Line>(lineDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async listByName(): Promise<Line[]> {
    try {
      const lines = await this.lineRepo.listByName();
      return lines;
    } catch (e) {
      throw e;
    }
  }
  public async listByCode(): Promise<Line[]> {
    try {
      const lines = await this.lineRepo.listByCode();
      return lines;
    } catch (e) {
      throw e;
    }
  }

  public async filterByName(name: string): Promise<Line[]> {
    try {
      const lines = await this.lineRepo.filterByName(name);
      return lines;
    } catch (e) {
      throw e;
    }
  }
  public async filterCode(key: string): Promise<Line[]> {
    try {
      const lines = await this.lineRepo.filterCode(key);
      return lines;
    } catch (e) {
      throw e;
    }
  }
}
