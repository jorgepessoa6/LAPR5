import INodeDTO from '../../dto/Node/nodeDTO';
import { Node } from '../node';
describe('Create a valid node', () => {
    var keyTest = '1';
    var name1 = '1';
    var latitude1 = 1
    var longitude1 = 1
    var isDepot1 = false;
    var isReliefPoint1 = false;
    var shortName1 = '1';


    var node = Node.create({
        key: '1',
        name: '1',
        latitude: 1,
        longitude: 1,
        isDepot: false,
        isReliefPoint: false,
        shortName: '1',
        capacities: null,
        informationPoint: null,
        crewTravelTimes: null
    }).getValue();
    it("ensure all Parameters are well formed", () => {
        expect(node.key).toEqual(keyTest);
    });
    it("ensure all Parameters are well formed", () => {
        expect(node.latitude).toEqual(latitude1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(node.longitude).toEqual(longitude1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(node.isDepot).toEqual(isDepot1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(node.name).toEqual(name1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(node.isReliefPoint).toEqual(isReliefPoint1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(node.shortName).toEqual(shortName1);
    });

});