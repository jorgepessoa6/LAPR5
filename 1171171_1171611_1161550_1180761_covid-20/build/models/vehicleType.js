"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleType = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
class VehicleType extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    /*
      get vehicleID(): VehicleTypeID {
          return VehicleTypeID.create(this.id);
      }*/
    /* get key(): string {
         return this.props.key;
     }*/
    get name() {
        return this.props.name;
    }
    get autonomy() {
        return this.props.autonomy;
    }
    get cost() {
        return this.props.cost;
    }
    get averageSpeed() {
        return this.props.averageSpeed;
    }
    get energySource() {
        return this.props.energySource;
    }
    get consumption() {
        return this.props.consumption;
    }
    get emissions() {
        return this.props.emissions;
    }
    get ParametersValues() {
        return this.props.ParametersValues;
    }
    get Vehicles() {
        return this.props.Vehicles;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(vehicleTypeDTO, id) {
        //const key = vehicleTypeDTO.key;  
        const name = vehicleTypeDTO.name;
        const autonomy = vehicleTypeDTO.autonomy;
        const cost = vehicleTypeDTO.cost;
        const averageSpeed = vehicleTypeDTO.averageSpeed;
        const energySource = vehicleTypeDTO.energySource;
        const consumption = vehicleTypeDTO.consumption;
        const emissions = vehicleTypeDTO.emissions;
        const ParametersValues = vehicleTypeDTO.ParametersValues;
        const Vehicles = vehicleTypeDTO.Vehicles;
        //MELHORAR
        if (!!name === false || name.length === 0) {
            return Result_1.Result.fail('Must provide a vehicleType name');
        }
        else {
            const vehicleType = new VehicleType({
                //key: key,
                name: name,
                autonomy: autonomy,
                cost: cost,
                averageSpeed: averageSpeed,
                energySource: energySource,
                consumption: consumption,
                emissions: emissions,
                ParametersValues: ParametersValues,
                Vehicles: Vehicles,
            }, id);
            return Result_1.Result.ok(vehicleType);
        }
    }
}
exports.VehicleType = VehicleType;
//# sourceMappingURL=vehicleType.js.map