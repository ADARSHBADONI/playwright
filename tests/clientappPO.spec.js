const{test,expect}=require('@playwright/test');
import { PoManager } from '../pageobjects/poManager';

test('client app login',async ({page})=>{
    
    const manager = new PoManager(page);
    const productName = "ZARA COAT 3";
    const email = "adarshbadoni420@gmail.com";
    const pass = 'Adarsh@123'
    const OBJ = manager.getLoginPage();
    await OBJ.goTo()
    await OBJ.validLogin(email,pass)
    const obj1 = manager.getdashboardpage();
    await obj1.searchproductAddCart(productName);
    await obj1.navigateToCart();



    //console.log(await cardtitles.first().textContent());
    

    await page.locator('div li').first().waitFor();
    const bool= await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect (bool).toBeTruthy()
    await page.locator("text=checkout").click();
    await page.locator('.small input ').first().fill("234");
    await page.locator("input[type='text']").nth(2).fill("adarsh");
    await page.locator("[placeholder*='Select Country']").pressSequentially("Ind");
    const dropdown = page.locator('.ta-results')
    await dropdown.waitFor();
    const optioncount = await dropdown.locator("button").count();
    
    console.log(optioncount);
    for(let i=0 ; i< optioncount ; ++i){
        const text = await dropdown.locator("button").nth(i).textContent();
        if( text === ' India'){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
    const orderID= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

    await page.locator("button[ routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator('tbody tr');
    for(let i=0 ; i<await rows.count();i++){
        const roworderid = await rows.nth(i).locator('th').textContent();
        if(orderID.includes(roworderid)){
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    const orderiddetails = await page.locator('.col-text').textContent();
    expect(orderID.includes(orderiddetails)).toBeTruthy();
});