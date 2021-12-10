import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo() {
    return browser.get('http://localhost:4200/#/trip');
  }

  getLine() {
    return element(by.name('lines'));
  }
  getHora() {
    return element(by.name('beginHour'));
  }
  getFrequency() {
    return element(by.name('frequency'));
  }
  getNumOfTrips() {
    return element(by.name('numOfTrips'));
  }
  getPathsGo() {
    return element(by.name('pathsGo'));
  }

  getPathsReturn() {
    return element(by.name('pathsReturn'));
  }
  getAddButton() {
    return element(by.id('botaoAdicionar'));
  }
}
