"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vehicle_1 = require("../vehicle");
describe('Create a valid vehicle', () => {
    var name1 = 'name';
    var autonomy1 = 10;
    var cost1 = 10;
    var averageSpeed1 = 10;
    var energySource1 = -10;
    var consumption1 = 10;
    var emissions1 = 10;
    //var source: number[] = [1, 20, 23, 50, 75];
    var vehicle = vehicle_1.Vehicle.create({ name: 'name',
        autonomy: 10,
        cost: 10,
        averageSpeed: 10,
        energySource: -10,
        consumption: 10,
        emissions: 10,
        ParametersValues: null,
        Vehicles: null });
    it("ensure all Parameters are well formed", () => {
        expect(vehicle.getValue().name).toEqual(name1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(vehicle.getValue().autonomy).toEqual(autonomy1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(vehicle.getValue().cost).toEqual(cost1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(vehicle.getValue().averageSpeed).toEqual(averageSpeed1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(vehicle.getValue().energySource).toEqual(energySource1);
        console.log("Energy Source bem introduzida");
    });
    it("ensure all Parameters are well formed", () => {
        expect(vehicle.getValue().consumption).toEqual(consumption1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(vehicle.getValue().emissions).toEqual(emissions1);
    });
});
//# sourceMappingURL=vehicle.test.js.map