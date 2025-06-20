import {test ,expect} from '@playwright/test'

test('some more validation', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // await page.goto("http://google.com")
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on("dialog",dialog =>dialog.accept());//dialog.accept()//dialog.dismiss()
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framespage = page.frameLocator("#courses-iframe");
    await framespage.locator("li [href*='lifetime-access']:visible").click();
    const textcheck = await framespage.locator(".text h2").textContent();
    console.log(textcheck.split(" ")[1]);

});

test ('screenshot and visual comparision',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'partialscreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'});

    await expect(page.locator("#displayed-text")).toBeHidden();
})