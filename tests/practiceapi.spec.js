import {test,expect,request} from '@playwright/test'
let payload = {userEmail: "adarshbadoni420@gmail.com", userPassword: "Adarsh@123"}
let token;
test.beforeAll ('this is api test module', async ()=>{
    const apicontext = await request.newContext();
    const response = await apicontext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{data : payload});
    expect(response.ok()).toBeTruthy();
    const responsejson = await response.json()
    token = responsejson.token;
    console.log(token);
});

test ('only api' ,async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/client')
    page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    } ,token);
})