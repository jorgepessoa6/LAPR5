"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
class Vehicle extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    /*
      get vehicleID(): VehicleID {
          return VehicleID.create(this.id);
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
    static create(vehicleDTO, id) {
        //const key = vehicleDTO.key;  
        const name = vehicleDTO.name;
        const autonomy = vehicleDTO.autonomy;
        const cost = vehicleDTO.cost;
        const averageSpeed = vehicleDTO.averageSpeed;
        const energySource = vehicleDTO.energySource;
        const consumption = vehicleDTO.consumption;
        const emissions = vehicleDTO.emissions;
        const ParametersValues = vehicleDTO.ParametersValues;
        const Vehicles = vehicleDTO.Vehicles;
        //MELHORAR
        if (!!name === false || name.length === 0) {
            return Result_1.Result.fail('Must provide a vehicle name');
        }
        else {
            const vehicle = new Vehicle({
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
            return Result_1.Result.ok(vehicle);
        }
    }
}
exports.Vehicle = Vehicle;
//# sourceMappingURL=vehicle.js.map