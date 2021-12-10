import { browser, by, element } from 'protractor';

export class AppPage {

    navigateTo() {
        return browser.get('http://localhost:4200/#/vehicle');
    }

    getmatriculaVehicle() {
        return element(by.name('matriculaVehicle'));
    }
    getVINVehcile() {
        return element(by.name('VINVehcile'));
    }
    getvehicleType() {
        return element(by.name('vehicleType'));
    }
    getdataEntradaVehicle() {
        return element(by.name('dataEntradaVehicle'));
    }
    getAddButton() {
        return element(by.id('botaoAdicionar'));
    }
}

