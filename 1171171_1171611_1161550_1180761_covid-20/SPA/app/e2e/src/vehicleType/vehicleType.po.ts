import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('http://localhost:4200/#/vehicleType');
  }

  getName() {
    return element(by.name('nameVehicleType'));
  }
  getAutonomy() {
    return element(by.name('autonomyVehicleType'));
  }
  getCost() {
    return element(by.name('costVehicleType'));
  }
  getAverageSpeed() {
    return element(by.name('averageSpeedVehicleType'));
  }
  getEnergySource() {
    return element(by.name('energySourceVehicleType'));
  }
  getConsumption() {
    return element(by.name('consumptionVehicleType'));
  }
  getEmissions() {
    return element(by.name('emissionsVehicleType'));
  }

  getAddButton() {
    return element(by.id('botaoAdicionar'));
  }
}
