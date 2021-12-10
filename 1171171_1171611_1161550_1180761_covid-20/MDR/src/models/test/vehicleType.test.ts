import { ENUM } from 'sequelize/types';
import IVehicleTypeDTO from '../../dto/VehicleType/vehicleTypeDTO';
import { VehicleType } from '../vehicleType';
describe('Create a valid vehicleType', () => {
    var name1 = 'name';
    var autonomy1 = 10;
    var cost1 = 10;
    var averageSpeed1= 10;
    var energySource1= -10;
    var consumption1= 10;
    var emissions1 = 10;
    //var source: number[] = [1, 20, 23, 50, 75];

    
    var vehicleType = VehicleType.create( {name:'name',
                                    autonomy:10,
                                    cost:10,
                                    averageSpeed:10,
                                    energySource:-10,
                                    consumption:10,
                                    emissions:10,
                                    ParametersValues:null,
                                    Vehicles:null});
    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.getValue().name).toEqual(name1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.getValue().autonomy).toEqual(autonomy1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.getValue().cost).toEqual(cost1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.getValue().averageSpeed).toEqual(averageSpeed1);
    });

    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.getValue().energySource).toEqual(energySource1);
        console.log("Energy Source bem introduzida")
    });
    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.getValue().consumption).toEqual(consumption1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.getValue().emissions).toEqual(emissions1);
    });
});