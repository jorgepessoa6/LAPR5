"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tripulante = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
class Tripulante extends AggregateRoot_1.AggregateRoot {
    /* get id(): UniqueEntityID {
         return this._id;
     }
   
     get tripulanteID(): TripulanteID {
         return TripulanteID.create(this.id);
     }*/
    get key() {
        return this.props.key;
    }
    get name() {
        return this.props.name;
    }
    get description() {
        return this.props.description;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(tripulanteDTO, id) {
        const key = tripulanteDTO.key;
        const name = tripulanteDTO.name;
        const description = tripulanteDTO.description;
        //MELHORAR
        if (!!name === false || name.length === 0) {
            return Result_1.Result.fail('Must provide a tripulante name');
        }
        else {
            const tripulante = new Tripulante({
                key: key,
                name: name,
                description: description,
            }, id);
            return Result_1.Result.ok(tripulante);
        }
    }
}
exports.Tripulante = Tripulante;
//# sourceMappingURL=tripulante.js.map