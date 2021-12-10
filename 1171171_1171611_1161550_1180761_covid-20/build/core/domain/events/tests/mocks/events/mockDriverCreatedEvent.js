"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDriverCreatedEvent = void 0;
class MockDriverCreatedEvent {
    constructor(id) {
        this.id = id;
        this.dateTimeOccurred = new Date();
    }
    getAggregateId() {
        return this.id;
    }
}
exports.MockDriverCreatedEvent = MockDriverCreatedEvent;
//# sourceMappingURL=mockDriverCreatedEvent.js.map