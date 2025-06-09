import {test,expect} from '@playwright/test'

test ('other Way for client app',async ({page})=>{
    const email = "adarshbadoni420@gmail.com";
    const productName = "ZARA COAT 3";
    const product = page.locator('.card-body');
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Adarsh@123");
    await page.getByRole("button",{name : 'Login'}).click()
    await page.locator('.card-body b').first().waitFor();
    

    //await page.waitForLoadState('networkidle')

    await page.locator(".card-body").filter({hasText : "ZARA COAT 3"}).getByRole("button",{name : "Add to Cart"}).click();

    await page.getByRole("listitem").getByRole("button",{name: "Cart"}).click();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button",{name : "Checkout"}).click();

   
    await page.getByPlaceholder('Select Country').pressSequentially("Ind");
    
    await page.getByRole("button" , {name : "India"}).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order")).toBeVisible();
});