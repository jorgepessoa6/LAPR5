"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Viatura = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
class Viatura extends AggregateRoot_1.AggregateRoot {
    /* get id(): UniqueEntityID {
         return this._id;
     }
   
     get viaturaID(): ViaturaID {
         return ViaturaID.create(this.id);
     }*/
    get key() {
        return this.props.key;
    }
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
    constructor(props, id) {
        super(props, id);
    }
    static create(viaturaDTO, id) {
        const key = viaturaDTO.key;
        const name = viaturaDTO.name;
        const autonomy = viaturaDTO.autonomy;
        const cost = viaturaDTO.cost;
        const averageSpeed = viaturaDTO.averageSpeed;
        const energySource = viaturaDTO.energySource;
        const consumption = viaturaDTO.consumption;
        const emissions = viaturaDTO.emissions;
        //MELHORAR
        if (!!name === false || name.length === 0) {
            return Result_1.Result.fail('Must provide a viatura name');
        }
        else {
            const viatura = new Viatura({
                key: key,
                name: name,
                autonomy: autonomy,
                cost: cost,
                averageSpeed: averageSpeed,
                energySource: energySource,
                consumption: consumption,
                emissions: emissions
            }, id);
            return Result_1.Result.ok(viatura);
        }
    }
}
exports.Viatura = Viatura;
//# sourceMappingURL=viatura.js.map