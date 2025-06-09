import {test,expect} from "@playwright/test"


test ("calander test", async ({page})=>
{
    const  monthNumber = "6";
    const date = "15"
    const year = '2027'
    const expectedlist = [monthNumber,date,year]
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
     await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber-1)).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    const input =page.locator(".react-date-picker__inputGroup input");
    for(let i=0 ; i<input.length ; i++)
    {
        const value =input[i].getAttribute('value');
        expect(value).toEqual(expectedlist[i]);
        break;
    }



});
