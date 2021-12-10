import { browser, logging, by, element, protractor, WebElement } from 'protractor';
import { AppPage } from './workblock.po';
var id;


describe('Testes workBlock', function () {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('Adiciona workBlock', async () => {

        await page.navigateTo();

        await page.getTrip().sendKeys("Trip: 1");

        await page.getAddButton().click();

        await page.getTrip().sendKeys("Trip: 2");

        await page.getAddButton().click();

        await page.getDuracao().sendKeys(20);

        await page.getNumero().sendKeys(20);

        await page.getAddButton2().click();


        await browser.wait(function () {
            return browser.switchTo().alert().then(
                function () { return true; },
                function () { return false; }
            );

        });

        await browser.switchTo().alert().then((alert) => {
            expect(alert.getText()).toString().includes("Blocos de trabalho criados com sucesso");
            alert.dismiss();
        })
    });
})

