import { browser, by, element } from 'protractor';

export class AppPage {
  
  navigateTo() {
    return browser.get('http://localhost:4200/#/driverDuty');
  }

  getCode() {
    return element(by.name('code'));
  }
  getRGB() {
    return element(by.name('rgb'));
  }
  getWorkBlocks() {
    return element(by.name('contiguousWB'));
  }
  getAddButton() {
    return element(by.id('botaoAdic'));
  }

  getAddButton2() {
    return element(by.id('botaoAdic2'));
  }
}
