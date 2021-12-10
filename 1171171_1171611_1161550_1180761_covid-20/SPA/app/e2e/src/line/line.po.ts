import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo() {
    return browser.get('http://localhost:4200/#/line');
  }

  getName() {
    return element(by.name('nameLine'));
  }
  getColor() {
    return element(by.name('colorLine'));
  }
  getNode1() {
    return element(by.name('nodes'));
  }
  getNode2() {
    return element(by.name('nodes1'));
  }

  getAddButton() {
    return element(by.id('botaoAdicionar'));
  }
}
