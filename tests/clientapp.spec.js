const{test,expect}=require('@playwright/test');

test('client app login',async ({page})=>{
    const username = page.locator('#userEmail');
    const password =  page.locator('#userPassword');
    const cardtitles = page.locator('.card-body b');
    const product = page.locator('.card-body');
    const productName = "ZARA COAT 3";
    const email = "adarshbadoni420@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");

    await username.fill(email);
    await password.fill('Adarsh@123')
    await page.locator("#login").click()

    //await page.waitForLoadState('networkidle')

    console.log(await cardtitles.first().textContent());
    const alltitles= await cardtitles.allTextContents();
    console.log(alltitles);
    const count = await product.count()
    console.log(count);
    for (let i=0; i<count ; ++i){
        console.log("inside loop");
        if(await product.nth(i).locator("b").textContent()=== productName){

            await product.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='/dashboard/cart']").click();
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
    await expect(page.locator(".hero-primary")).toHaveText(" Thnkyou for the order. ");
    //const orderID= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    //console.log(orderID);
})