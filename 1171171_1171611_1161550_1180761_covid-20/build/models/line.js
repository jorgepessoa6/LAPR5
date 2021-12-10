"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
class Line extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    /*   get lineID(): LineID {
      return LineID.create(this.id);
    } */
    get key() {
        return this.props.key;
    }
    get name() {
        return this.props.name;
    }
    get color() {
        return this.props.color;
    }
    get linePath() {
        return this.props.linePath;
    }
    get allowedDrivers() {
        return this.props.allowedDrivers;
    }
    get disallowedDrivers() {
        return this.props.disallowedDrivers;
    }
    get allowedVehicles() {
        return this.props.allowedVehicles;
    }
    get disallowedVehicles() {
        return this.props.disallowedVehicles;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(lineDTO, id) {
        const key = lineDTO.key;
        const name = lineDTO.name;
        const color = lineDTO.color;
        const linePath = new Array();
        const allowedDrivers = new Array();
        const disallowedDrivers = new Array();
        const allowedVehicles = new Array();
        const disallowedVehicles = new Array();
        if (!!name === false || name.length === 0) {
            return Result_1.Result.fail('Must provide a Line/Key name');
        }
        else {
            const line = new Line({
                key: key,
                name: name,
                //color: RGB.create(color),
                color: color,
                linePath: linePath,
                allowedDrivers: allowedDrivers,
                disallowedDrivers: disallowedDrivers,
                allowedVehicles: allowedVehicles,
                disallowedVehicles: disallowedVehicles,
            }, id);
            return Result_1.Result.ok(line);
        }
    }
    static createImport(lineDTO, id) {
        const key = lineDTO.key;
        const name = lineDTO.name;
        const color = lineDTO.color;
        const linePath = lineDTO.linePaths;
        const allowedDrivers = new Array();
        const disallowedDrivers = new Array();
        const allowedVehicles = new Array();
        const disallowedVehicles = new Array();
        if (!!name === false || name.length === 0 || !!key === false || key.length === 0) {
            return Result_1.Result.fail('Must provide a Line/Key name');
        }
        else {
            const line = new Line({
                key: key,
                name: name,
                //color: RGB.create(color),
                color: color,
                linePath: linePath,
                allowedDrivers: allowedDrivers,
                disallowedDrivers: disallowedDrivers,
                allowedVehicles: allowedVehicles,
                disallowedVehicles: disallowedVehicles,
            }, id);
            return Result_1.Result.ok(line);
        }
    }
}
exports.Line = Line;
//# sourceMappingURL=line.js.map