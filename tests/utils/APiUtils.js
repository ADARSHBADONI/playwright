class APiUtils
{   
    constructor(apicontext, loginpayload)
    {
        this.apicontext=apicontext;
        this.loginpayload = loginpayload;
    }
    async getToken()
    {
        const loginResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:this.loginpayload});
        const loginResponsejson = await loginResponse.json()
        const token = loginResponsejson.token;
        console.log(token);
        return token;
    }
    async createOrder(orderpayload){
        let response = {}
        response.token = await this.getToken()
        const orderResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data:orderpayload,
                    headers:{
                        'Authorization':response.token,
                        'Content-Type':'application/json'
                },
            })
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            const orderId = orderResponseJson.orders[0];
            response.orderId = orderId;
            return response;
    }
}
module.exports= {APiUtils};