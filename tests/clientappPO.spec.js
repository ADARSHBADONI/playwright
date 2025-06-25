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
    

    const cartPage = manager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
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