const{test,expect}=require('@playwright/test');
import { PoManager } from '../pageobjects/poManager';
import { customtest } from './utils/test-base.js';

//json ->string ->javascript object
const dataset =  JSON.parse(JSON.stringify(require("./utils/placeOrderTestData.json")));
for (const data of dataset){
test(`client app login ${data.productName}`,async ({page})=>{
    console.log(dataset);
    const manager = new PoManager(page);
    const OBJ = manager.getLoginPage();
    await OBJ.goTo()
    await OBJ.validLogin(data.email,data.pass)
    const obj1 = manager.getdashboardpage();
    await obj1.searchproductAddCart(data.productName);
    await obj1.navigateToCart();
    

    const cartPage = manager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = manager.getorderReview();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await obj1.navigateToOrders();
   const ordersHistoryPage = manager.getorderhistory();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
}

customtest.only('client app login' ,async ({page,testDataForOrder})=>{
    const manager = new PoManager(page);
    const OBJ = manager.getLoginPage();
    await OBJ.goTo()
    await OBJ.validLogin(testDataForOrder.email,testDataForOrder.pass)
    const obj1 = manager.getdashboardpage();
    await obj1.searchproductAddCart(testDataForOrder.productName);
    await obj1.navigateToCart();
    

    const cartPage = manager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();

});