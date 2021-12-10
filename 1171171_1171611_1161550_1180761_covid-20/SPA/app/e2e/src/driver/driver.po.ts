import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('http://localhost:4200/#/drivers');
  }

  getName() {
    return element(by.name('nameDriver'));
  }
  getDescription() {
    return element(by.name('descriptionDriver'));
  }

  getAddButton() {
    return element(by.id('botaoAdicionar'));
  }
}
