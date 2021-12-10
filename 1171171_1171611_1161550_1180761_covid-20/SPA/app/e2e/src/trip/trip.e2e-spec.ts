import { browser, logging, by, element, protractor, WebElement } from 'protractor';
import { AppPage } from './trip.po';
var id;


describe('Testes trip', function () {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('Adiciona trip', async () => {

        await page.navigateTo();

        await page.getLine().sendKeys("Paredes_Aguiar");

        await page.getHora().sendKeys("12:00:00");

        await page.getFrequency().sendKeys(20);

        await page.getNumOfTrips().sendKeys(2);

        await page.getPathsGo().sendKeys("Path:3");

        await page.getPathsReturn().sendKeys("Path:1");

        await page.getAddButton().click();


        await browser.wait(function () {
            return browser.switchTo().alert().then(
                function () { return true; },
                function () { return false; }
            );

        });

        await browser.switchTo().alert().then((alert) => {
            expect(alert.getText()).toString().includes("Viagem para a linha da rede com nome Paredes_Aguiar com início às 12:00:00 horas, adicionada!");
            alert.dismiss();
        })

    });
})

