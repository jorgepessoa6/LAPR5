"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrewTravelTimes = void 0;
const ValueObject_1 = require("../core/domain/ValueObject");
class CrewTravelTimes extends ValueObject_1.ValueObject {
    get duration() {
        return this.duration;
    }
    constructor(props) {
        super(props);
    }
    static create(duration) {
        const crew = new CrewTravelTimes({
            duration: duration
        });
        return crew;
    }
}
exports.CrewTravelTimes = CrewTravelTimes;
//# sourceMappingURL=crewTravelTimes.js.map