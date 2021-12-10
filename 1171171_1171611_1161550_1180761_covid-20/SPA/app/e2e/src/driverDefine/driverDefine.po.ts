import { browser, by, element } from 'protractor';

export class AppPage {

    navigateTo() {
        return browser.get('http://localhost:4200/#/defineDrivers');
    }

    getnrMecanoDriver() {
        return element(by.name('nrMecanoDriver'));
    }
    getnomeDriver() {
        return element(by.name('nomeDriver'));
    }
    getdataNascimentoDriver() {
        return element(by.name('dataNascimentoDriver'));
    }
    getCCDriver() {
        return element(by.name('CCDriver'));
    }
    getNIFDriver() {
        return element(by.name('NIFDriver'));
    }
    getdriverType() {
        return element(by.name('driverType'));
    }
    getdataSaidaDriver() {
        return element(by.name('dataSaidaDriver'));
    }

    getdataCartaConducaoDriver() {
        return element(by.name('dataCartaConducaoDriver'));
    }

    getdataEntradaDriver() {
        return element(by.name('dataEntradaDriver'));
    }
    getnrCartaConducaoDriver() {
        return element(by.name('nrCartaConducaoDriver'));
    }
    getAddType() {
        return element(by.id('botaoAdic'));
    }
    getAddButton() {
        return element(by.id('botaoAdicionar'));
    }
}

