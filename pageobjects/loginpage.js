
class loginpage {
  constructor(page) {
    this.page = page;
    this.SignInButton = page.locator("#login");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
  }
  async goTo(){
    await this.page.goto('https://rahulshettyacademy.com/client');
  }

  async validLogin(email,pass) {
    await this.userName.fill(email);
    await this.password.fill(pass);
    await this.page.locator("#login").click();
    await this.page.waitForLoadState('networkidle');
  }

}
module.exports= {loginpage}