"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RGB = void 0;
const ValueObject_1 = require("../core/domain/ValueObject");
class RGB extends ValueObject_1.ValueObject {
    get red() {
        return this.red;
    }
    get blue() {
        return this.blue;
    }
    get green() {
        return this.green;
    }
    constructor(props) {
        super(props);
    }
    static create(rgbDTO) {
        var temp = rgbDTO.split(',');
        var temp1 = temp[0].split('(');
        var temp2 = temp[2].slice(0, -1);
        const red = parseInt(temp1[1], 10);
        console.log(red);
        const green = parseInt(temp[1], 10);
        console.log(green);
        const blue = parseInt(temp2, 10);
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
exports.RGB = RGB;
//# sourceMappingURL=RGB.js.map