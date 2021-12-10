import { browser, by, element, logging } from 'protractor';
import { AppPage } from './node.po';

describe('Node Tests', () => {
    let page: AppPage;

    beforeEach(function () {
        page = new AppPage();
    });

    it('should add Node', async () => {

        await page.navigateTo();

        await page.getKey().sendKeys("Node:500");

        await page.getName().sendKeys("Algarve");

        await page.getLat().sendKeys(1);

        await page.getLon().sendKeys(1);

        await page.getShortName().sendKeys("Algarve");

        await page.getisDepot().sendKeys("Sim");

        await page.getReliefPoint().sendKeys("Não");

        await page.getAddButton().click();

        await browser.wait(function () {
            return browser.switchTo().alert().then(
                function () { return true; },
                function () { return false; }
            );

        });

        await browser.switchTo().alert().then((alert) => {
            expect(alert.getText()).toString().includes('Nó de rede com nome Algarve adicionado');
            alert.dismiss();
        })

    });
});