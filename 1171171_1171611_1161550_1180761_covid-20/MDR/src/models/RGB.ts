import IRgbDTO from '../dto/RGB/rgbDTO';
import { Result } from '../core/logic/Result';
import { ValueObject } from '../core/domain/ValueObject';
import config from '../config';

interface RGBProps {
  red: number;
  blue: number;
  green: number;
}

export class RGB extends ValueObject<RGBProps> {
  get red(): number {
    return this.red;
  }

  get blue(): number {
    return this.blue;
  }

  get green(): number {
    return this.green;
  }

  public constructor(props: RGBProps) {
    super(props);
  }

  public static create(rgbDTO: string): RGB {
    var temp = rgbDTO.split(',');
    var temp1 = temp[0].split('(');
    var temp2 = temp[2].slice(0, -1);


    const red = parseInt(temp1[1],10);
    console.log(red);       
    const green = parseInt(temp[1],10);
    console.log(green);

    const blue = parseInt(temp2,10);
    console.log(blue);


    const rgb = new RGB({
      red: red,
      green: green,
      blue: blue,
    });
    console.log(rgb);
    return rgb;
  }
}
