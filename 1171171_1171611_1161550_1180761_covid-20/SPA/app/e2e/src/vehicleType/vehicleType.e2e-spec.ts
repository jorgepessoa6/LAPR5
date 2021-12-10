import { browser, logging, by, element, protractor, WebElement } from 'protractor';
import { AppPage } from './vehicleType.po';
var id;


describe('Testes Tipo de Viatura', function () {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('Adiciona tipo de viatura', async () => {

        await page.navigateTo();

        await page.getName().sendKeys("Aviao");

        await page.getAutonomy().sendKeys(50000);

        await page.getCost().sendKeys(10);

        await page.getAverageSpeed().sendKeys(10);

        await page.getEnergySource().sendKeys("GPL");

        await page.getConsumption().sendKeys(10);

        await page.getEmissions().sendKeys(100);

        await page.getAddButton().click();

        await browser.wait(function () {
            return browser.switchTo().alert().then(
                function () { return true; },
                function () { return false; }
            );

        });

        await browser.switchTo().alert().then((alert) => {
            expect(alert.getText()).toString().includes("Tipo de viatura com o nome Aviao adicionado");
            alert.dismiss();
        })

    });
})

