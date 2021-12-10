import { browser, by, element } from 'protractor';

export class AppPage {

   navigateTo(){
   return browser.get('http://localhost:4200/#/node') ;
  }

  getKey(){
    return element(by.name('keyNode'));
  }
   getName(){
    return element(by.name('nameNode'));
  }
   getLat() {
    return element(by.name('latNode'));
  }
   getLon(){
    return element(by.name('lonNode'));
  }
   getShortName() {
    return element(by.name('shortName'));
  }
   getisDepot(){
    return element(by.name('isDepot'));
  }
   getReliefPoint() {
    return element(by.name('isReliefPoint'));
  }
  getAddButton() {
    return element(by.name('botaoAdicionarAdd'));
  }
  getListButton() {
    return element(by.id('botaoAdicionarGetNodes'));
  }
}

