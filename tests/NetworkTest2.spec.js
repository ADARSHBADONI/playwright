import { test, expect, request } from "@playwright/test";

test("Security test request intercept", async ({ page }) => {
  const username = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const cardtitles = page.locator(".card-body b");
  const product = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const email = "adarshbadoni420@gmail.com";
  await page.goto("https://rahulshettyacademy.com/client");

  await username.fill(email);
  await password.fill("Adarsh@123");
  await page.locator("#login").click();
  await page.locator("button[ routerlink*='myorders']").click();

  page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6849496281a2069530702bf6"}));
      

  await page.locator("button:has-text('View')").first().click();
  await page.pause();
  await expect(page.locator('p').last()).toHaveText("You are not authorize to view this order");
});
