import { browser, by, element } from 'protractor';

export class AppPage {
  
  navigateTo() {
    return browser.get('http://localhost:4200/#/workBlock');
  }

  getTrip() {
    return element(by.name('tripsClone'));
  }
  getDuracao() {
    return element(by.name('duracao'));
  }
  getNumero() {
    return element(by.name('numero'));
  }
  getAddButton() {
    return element(by.id('botaoAdic'));
  }

  getAddButton2() {
    return element(by.id('botaoAdicionar'));
  }
}
