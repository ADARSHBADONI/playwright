const { dashboard } = require("./dashboard");
const { loginpage } = require("./loginpage");

class PoManager{
    constructor(page){
        this.page=page;
        this.login =new loginpage(page);
        this.dash = new dashboard(page) ;
    }
    getLoginPage(){
        return this.login;
    }
    getdashboardpage(){
        return this.dash;
    }
}
module.exports = {PoManager}