import { browser, by, element, logging } from 'protractor';
import { AppPage } from './defineVehicle.po';

describe('DefineVehicle Tests', () => {
    let page: AppPage;

    beforeEach(function () {
        page = new AppPage();
    });

    it('should add DefineVehicle', async () => {

        await page.navigateTo();

        await page.getmatriculaVehicle().sendKeys("AA-10-20");

        await page.getVINVehcile().sendKeys("123456789ABCABCAB");

        await page.getvehicleType().sendKeys("Aviao");

        await page.getdataEntradaVehicle().sendKeys("24/10/2000");

        await page.getAddButton().click();

        await browser.wait(function () {
            return browser.switchTo().alert().then(
                function () { return true; },
                function () { return false; }
            );

        });

        await browser.switchTo().alert().then((alert) => {
            expect(alert.getText()).toString().includes('Tipo de viatura com a matricula AA-10-20 adicionada');
            alert.dismiss();
        })

    });
});