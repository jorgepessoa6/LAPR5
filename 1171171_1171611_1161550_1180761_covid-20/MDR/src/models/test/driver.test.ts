import IDriverDTO from '../../dto/Driver/driverDTO';
import { Driver } from '../driver';
describe('Create a valid driver', () => {
    var name1 = 'name';
    var description1="descriptionlongenough"

    
    var driver = Driver.create( {name:'name',description:"descriptionlongenough"}).getValue();
    it("ensure all Parameters are well formed", () => {
        expect(driver.name).toEqual(name1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(driver.description).toEqual(description1);
    });
});