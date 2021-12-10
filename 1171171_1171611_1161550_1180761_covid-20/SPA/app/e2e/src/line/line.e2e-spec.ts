import { browser, logging, by, element, protractor, WebElement } from 'protractor';
import { AppPage } from './line.po';
var id;


describe('Testes Lines', function () {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('Adiciona Line', async () => {

        await page.navigateTo();

        await page.getName().sendKeys("Line: 9");

        await page.getColor().sendKeys("RGB(38,91,11)");

        await page.getNode1().sendKeys("Aguiar de Sousa");

        await page.getNode2().sendKeys("Baltar");

        await page.getAddButton().click();


        await browser.wait(function () {
            return browser.switchTo().alert().then(
                function () { return true; },
                function () { return false; }
            );

        });

        await browser.switchTo().alert().then((alert) => {
            expect(alert.getText()).toString().includes("Linha da rede com nome Line: 9 adicionada!");
            alert.dismiss();
        })

    });
})

