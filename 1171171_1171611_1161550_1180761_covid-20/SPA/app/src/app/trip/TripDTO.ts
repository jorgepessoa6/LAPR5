import { Direction } from '../path/direction';
import { PassingTime } from './PassingTime';

export interface ITripDTO {
  key: string;
  isEmpty: Boolean;
  orientation: Direction;
  lineKey: string;
  path: string;
  isGenerated: boolean;
  passingTime: PassingTime[];
}
