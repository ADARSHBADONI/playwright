import {test, expect,request} from '@playwright/test'
import { APiUtils } from './utils/APiUtils';
const loginpayload = {userEmail:"adarshbadoni420@gmail.com",userPassword:"Adarsh@123"};
const orderpayload = {orders: [{country: "india", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
const fakepayloadOrders = {data:[] , message:'No Orders'};
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
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>
    {
        //intercepting response - api response->{playwright fake response}-> browser-> render data on front end
       const response = page.request.fetch(route.request());
       let body = JSON.stringify(fakepayloadOrders);
       route.fulfill({
        response,
        body,
       });

    });
    await page.locator("button[ routerlink*='myorders']").click();
    page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
    // await page.locator("tbody").waitFor();
    // const rows = page.locator('tbody tr');
    // for(let i=0 ; i<await rows.count();i++){a
    //     const roworderid = await rows.nth(i).locator('th').textContent();
    //     if(response.orderId.includes(roworderid)){
    //         await rows.nth(i).locator('button').first().click();
    //         break;
    //     }
    // }
    // const orderiddetails = await page.locator('.col-text').textContent();
    // await page.pause();
    // expect(response.orderId.includes(orderiddetails)).toBeTruthy();
    
});