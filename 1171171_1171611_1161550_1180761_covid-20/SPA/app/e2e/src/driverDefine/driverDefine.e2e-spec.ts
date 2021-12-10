import { browser, by, element, logging } from 'protractor';
import { AppPage } from './driverDefine.po';

describe('DefineDriver Tests', () => {
    let page: AppPage;

    beforeEach(function () {
        page = new AppPage();
    });

    it('should add DefineDriver', async () => {

        await page.navigateTo();

        await page.getnrMecanoDriver().sendKeys("123456789");

        await page.getnomeDriver().sendKeys("Andre");

        await page.getdataNascimentoDriver().sendKeys("24/10/2000");

        await page.getCCDriver().sendKeys(123456789);

        await page.getNIFDriver().sendKeys(123456789);

        await page.getdriverType().sendKeys("Marco");
        await page.getAddType().click();

        await page.getdataSaidaDriver().sendKeys("24/10/2000");

        await page.getdataCartaConducaoDriver().sendKeys("24/10/2000");
        await page.getdataEntradaDriver().sendKeys("24/10/2000");
        await page.getnrCartaConducaoDriver().sendKeys(123456789);

        await page.getAddButton().click();

        await browser.wait(function () {
            return browser.switchTo().alert().then(
                function () { return true; },
                function () { return false; }
            );

        });

        await browser.switchTo().alert().then((alert) => {
            expect(alert.getText()).toString().includes('Tripulante com o numero mecanografico 123456789 adicionado');
            alert.dismiss();
        })

    });
});