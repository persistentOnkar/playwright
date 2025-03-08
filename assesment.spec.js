import { test, expect } from '@playwright/test';

test.beforeEach('config', async({page }) => {
    await page.on('request', request => console.log('>>', request.method(), request.url()));
    await page.on('response', response => console.log('<<', response.status(), response.url()));
})

test('Assignment1', async ({page}) => {
    await page.goto('https://www.lambdatest.com/selenium-playground');
    await page.getByRole('link', { name: 'Simple Form Demo' }).click();
    await expect(page).toHaveURL(/.*simple-form-demo/);
    const  enterText= 'Welcome to LambdaTest';
    await page.waitForTimeout(2000);
    await page.locator('//input[@id="user-message"]').fill(enterText);
    await page.locator('//button[@id="showInput"]').click();
    await page.waitForTimeout(2000);
    await expect(page.locator('//*[@id="user-message"]//p[@id="message"]')).toHaveText(enterText);
});

test('Assignment2', async ({page}) => {
    await page.goto('https://www.lambdatest.com/selenium-playground');
    await page.getByRole('link', { name: 'Drag & Drop Sliders' }).click();
    await page.locator('//input[@value="15"]//ancestor::div[contains(@id,"slider")]').getByRole('slider').fill('95');
    await page.waitForTimeout(2000);
    await expect(page.locator('//input[@value="15"]//parent::*//output')).toHaveText("95");        
});

test('Assignment3', async ({page}) => {
    await page.goto('https://www.lambdatest.com/selenium-playground');
    page.on('dialog', dialog => {
        const dialogMsg = dialog.message();
        console.log(dialogMsg);
        print(dialogMsg);
        page.expect(dialogMsg,"Please fill in the fields");
    });
    await page.locator('//a[text()="Input Form Submit"]').click();
    await page.locator('//button[text()="Submit"]').click();
    await page.locator('//input[@id="name"]').fill('Demo Name');
    await page.locator('//input[@id="inputEmail4"]').fill('test@demo.com');
    await page.locator('//input[@name="password"]').fill('testPass');
    await page.locator('//input[@id="company"]').fill('Demo Company');
    await page.locator('//input[@id="websitename"]').fill('Test demo website');
    await page.locator('//select[@name="country"]').click();
    await page.getByRole('combobox').selectOption('US');
    await page.locator('//input[@id="inputCity"]').fill('Test City');
    await page.locator('//input[@id="inputAddress1"]').fill('address1');
    await page.locator('//input[@id="inputAddress2"]').fill('address2');
    await page.locator('//input[@id="inputState"]').fill('Alaska');
    await page.locator('//input[@id="inputZip"]').fill('98765');
    await page.locator('//button[text()="Submit"]').click();
    await expect(page.locator('//p[contains(@class,"success-msg")]')).toBeVisible();
})