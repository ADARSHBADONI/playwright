const { dashboard } = require("./dashboard");
const { loginpage } = require("./loginpage");
import { CartPage } from "./CartPage";
class PoManager {
  constructor(page) {
    this.page = page;
    this.login = new loginpage(page);
    this.dash = new dashboard(page);
    this.cartPage = new CartPage(this.page);
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
}

module.exports = { PoManager };
