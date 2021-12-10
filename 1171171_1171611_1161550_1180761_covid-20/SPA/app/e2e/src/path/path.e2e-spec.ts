import { browser, logging, by, element, protractor, WebElement } from 'protractor';
import { AppPage } from './path.po';
var id;


describe('Testes Paths', function () {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('Adiciona Path', async () => {
        await page.navigateTo();
        await page.getPathNode().sendKeys("Aguiar de Sousa");
        await page.getDist().sendKeys(1);
        await page.getDur().sendKeys(1);
        await page.getAddButtonPathNode().click();
        await page.getLine().sendKeys("Paredes_Lordelo");
        await page.getLinePath().sendKeys("LinePath: 900");
        await page.getPath().sendKeys("R1");
        await page.getDirection().sendKeys("Ida");
        await page.getisEmpty().sendKeys("Sim");

        await page.getAddButton().click();



        await browser.wait(function () {
            return browser.switchTo().alert().then(
                function () { return true; },
                function () { return false; }
            );

        });

        await browser.switchTo().alert().then((alert) => {
            expect(alert.getText()).toString().includes("Percurso com nome R1 adicionado");
            alert.dismiss();
        })

    });
})

