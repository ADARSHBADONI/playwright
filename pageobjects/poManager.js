const { dashboard } = require("./dashboard");
const { loginpage } = require("./loginpage");
import { CartPage } from "./CartPage";
import { OrdersHistoryPage } from "./orderHistorypage";
import { OrdersReviewPage } from "./orderReviewPage";
class PoManager {
  constructor(page) {
    this.page = page;
    this.login = new loginpage(page);
    this.dash = new dashboard(page);
    this.cartPage = new CartPage(this.page);
    this.OrdersHistory = new OrdersHistoryPage(this.page);
    this.OrdersReview = new OrdersReviewPage(this.page);
  }
  getLoginPage() {
    return this.login;
  }
  getdashboardpage() {
    return this.dash;
  }
  getCartPage() {
    return this.cartPage;
  }
  getorderhistory(){
    return this.OrdersHistory;
  }
  getorderReview(){
    return this.OrdersReview;
  }
}

module.exports = { PoManager };
