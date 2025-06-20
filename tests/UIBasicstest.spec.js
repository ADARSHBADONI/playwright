const{test,expect}=require('@playwright/test');
const { request } = require('http');

//This is a basic test
test('Browser context Playright test',async ({browser})=>
{
    //chrome-plugins/cookies
    const context = await browser.newContext();
    const page= await context.newPage();
    page.route('**/*.{jpg,png,jpeg}',route=>route.abort());
    const UserName = page.locator('#username');
    const Password = page.locator("[type='password']")
    const SignIn = page.locator('#signInBtn')
    const cardtitle = page.locator('.card-body a');
    page.on('request',request=>console.log(request.url()))
    page.on('response',response=>console.log(response.url(),response.status()));
    
   
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css,xpath type , fill - used in latest version
    await UserName.fill('rahulshetty');
    await Password.fill('learning')//for value attribute used [type='value']

    await SignIn.click()
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');// for style attribute we use [style*='block']
    
    await UserName.fill("")
    await UserName.fill("rahulshettyacademy")
    await SignIn.click()

    console.log(await cardtitle.first().textContent());
    const alltitles= await cardtitle.allTextContents();
    console.log(alltitles)
});
test ('Ui controls',async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const UserName = page.locator('#username');
    const Password = page.locator("[type='password']")
    const SignIn = page.locator('#signInBtn')
    const documentLink = page.locator("[href*='documents-']");request

    const dropdown =  page.locator('select.form-control');
    await dropdown.selectOption('Teacher');

    await page.locator('.radiotextsty').last().click()
    await page.locator("#okayBtn").click()

    //assertion
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
 
    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked();

    await page.locator("#terms").uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class","blinkingText");

   

    // if(dropdown.isVisible()){
    //     dropdown.click('Teacher');
    // }
 
});

test('child windows handling',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const UserName = page.locator('#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
    [context.waitForEvent('page'),//to listen for any new page pending,rejected,fulfilled
    documentLink.click(),])//new page is opened

    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);

    await UserName.fill(domain);
    // await page.pause();
    console.log(await UserName.textContent());
});
// test('page context Playright test',async ({page})=>
// {
    
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     //get title assersion
//     console.log(await page.title());
//     await expect(page).toHaveTitle("Google")
// });