class dashboard {
  constructor(page) {
    this.page = page;
    this.cardtitles = page.locator(".card-body b");
    this.product = page.locator(".card-body");
    this.cart = page.locator("[routerlink*='/dashboard/cart']");
    this.orders = page.locator("button[routerlink *= 'myorders']");
  }
  async searchproductAddCart(productName) {
    const alltitles = await this.cardtitles.allTextContents();
    console.log(alltitles);
    const count = await this.product.count();
    console.log(count);
    for (let i = 0; i < count; ++i) {
      console.log("inside loop");
      if (
        (await this.product.nth(i).locator("b").textContent()) === productName
      ) {
        await this.product.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }
  async navigateToOrders() {
    await this.orders.click();
  }

  async navigateToCart() {
    await this.cart.click();
  }
}
module.exports = { dashboard };
