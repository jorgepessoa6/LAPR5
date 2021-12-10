"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const driver_1 = require("../driver");
describe('Create a valid driver', () => {
    var name1 = 'name';
    var description1 = "descriptionlongenough";
    var driver = driver_1.Driver.create({ name: 'name', description: "descriptionlongenough" }).getValue();
    it("ensure all Parameters are well formed", () => {
        expect(driver.name).toEqual(name1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(driver.description).toEqual(description1);
    });
});
//# sourceMappingURL=driver.test.js.map