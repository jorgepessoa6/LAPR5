"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
class Driver extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    /*get driverID(): DriverID {
        return DriverID.create(this.id);
    }*/
    //get key(): string {
    //    return this.props.key;
    //}
    get name() {
        return this.props.name;
    }
    get description() {
        return this.props.description;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(driverDTO, id) {
        // const key = driverDTO.key;  
        const name = driverDTO.name;
        const description = driverDTO.description;
        //MELHORAR
        if (!!name === false || name.length === 0) {
            return Result_1.Result.fail('Must provide a driver name');
        }
        else {
            const driver = new Driver({
                //key: key,
                name: name,
                description: description,
            }, id);
            return Result_1.Result.ok(driver);
        }
    }
}
exports.Driver = Driver;
//# sourceMappingURL=driver.js.map