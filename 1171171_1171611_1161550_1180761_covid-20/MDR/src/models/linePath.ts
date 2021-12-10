import IPathDTO from '../dto/Path/pathDTO';
import { Entity } from '../core/domain/Entity';
import { Result } from '../core/logic/Result';
import { Path } from './path';

interface LinePathProps {
  key: string;
  path: string;
  orientation: Direction;
}

export class LinePath extends Entity<LinePathProps> {
  get key(): string {
    return this.props.key;
  }

  get path(): string {
    return this.props.path;
  }

  get orientation(): string {
    return this.props.orientation;
  }

  private constructor(props: LinePathProps) {
    super(props);
  }

  public static create(pathDTO: IPathDTO): Result<LinePath> {
    const key = pathDTO.linePathID;
    const path = pathDTO.key;
    const orientation = pathDTO.orientation;

    const linePath = new LinePath({
      key: key,
      path: path,
      orientation: orientation,
    });
    return Result.ok<LinePath>(linePath);
  }
}

