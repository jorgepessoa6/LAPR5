import { browser, logging, by, element, protractor, WebElement } from 'protractor';
import { AppPage } from './driverDuty.po';
var id;


describe('Testes servicesVehicle', function () {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('Adiciona servicesVehicle', async () => {

        await page.navigateTo();

        await page.getCode().sendKeys("V10000");

        await page.getRGB().sendKeys("RGB(12,12,12)");

        await page.getWorkBlocks().sendKeys("WorkBlock: 1");

        await page.getAddButton().click();

        await page.getWorkBlocks().sendKeys("WorkBlock: 2");

        await page.getAddButton().click();

        await page.getAddButton2().click();


        await browser.wait(function () {
            return browser.switchTo().alert().then(
                function () { return true; },
                function () { return false; }
            );

        });

        await browser.switchTo().alert().then((alert) => {
            expect(alert.getText()).toString().includes("Servico de triplantes com codigo V10000 adicionada!");
            alert.dismiss();
        })
    });
})

