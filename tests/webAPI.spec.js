import {test, expect,request} from '@playwright/test'
import { APiUtils } from './utils/APiUtils';
const loginpayload = {userEmail:"adarshbadoni420@gmail.com",userPassword:"Adarsh@123"};
const orderpayload = {orders: [{country: "india", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};

let response;

test.beforeAll( async()=>
{
    const apicontext =await request.newContext();
    const apiUtils = new APiUtils(apicontext,loginpayload);
    response = await apiUtils.createOrder(orderpayload);
    

});


test('this api test',async ({page})=>
{   
    
    page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token );
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[ routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator('tbody tr');
    for(let i=0 ; i<await rows.count();i++){
        const roworderid = await rows.nth(i).locator('th').textContent();
        if(response.orderId.includes(roworderid)){
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    const orderiddetails = await page.locator('.col-text').textContent();
    await page.pause();
    expect(response.orderId.includes(orderiddetails)).toBeTruthy();
    
});