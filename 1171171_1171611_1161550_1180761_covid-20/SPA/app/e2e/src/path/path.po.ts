import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('http://localhost:4200/#/path');
  }

  getLine() {
    return element(by.name('lines'));
  }
  getLinePath() {
    return element(by.name('linePathID'));
  }
  getPath() {
    return element(by.name('path'));
  }
  getDirection() {
    return element(by.name('orientation'));
  }
  getisEmpty() {
    return element(by.name('isEmpty'));
  }

  getPathNode() {
    return element(by.name('pathnode'));
  }

  getDist() {
    return element(by.name('distance'));
  }

  getDur() {
    return element(by.name('duration'));
  }

  getAddButtonPathNode() {
    return element(by.id('botaoAdic'));
  }

  getAddButton() {
    return element(by.id('botaoAdicionar'));
  }
}
