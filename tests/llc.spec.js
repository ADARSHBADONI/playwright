import {test,expect} from '@playwright/test'

test ('test',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("Adarsh@123");
    await page.getByRole("button",{name: 'submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!").isVisible();
    await page.getByRole("link",{name :'Shop'}).click();
    await page.locator("app-card").filter({hasText : 'Nokia Edge'}).getByRole("button").click();

    


})