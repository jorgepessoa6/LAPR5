import { browser, logging, by, element, protractor, WebElement } from 'protractor';
import { AppPage } from './driver.po';
var id;


describe('Testes Tipo de Tripulante', function () {
    let page: AppPage;

    beforeEach(()=>{
        page= new AppPage();
    });

    it('Adiciona tipo de tripulante', async () => {

        await page.navigateTo();

        await page.getName().sendKeys("Marco");

        await page.getDescription().sendKeys("Condutor com imensa experiência de pesados");

        await page.getAddButton().click();

        await browser.wait(function () {
            return browser.switchTo().alert().then(
                function () { return true; },
                function () { return false; }
            );

        });

        await browser.switchTo().alert().then((alert) => {
            expect(alert.getText()).toString().includes("Tipo de tripulante com nome Marco adicionada!");
        alert.dismiss();
        })

    });
})

