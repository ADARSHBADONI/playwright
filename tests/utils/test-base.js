const base = require('@playwright/test')

exports.customtest =base.test.extend(
 { 
    testDataForOrder: {
    productName: "ZARA COAT 3",
    email: "adarshbadoni420@gmail.com",
    pass: "Adarsh@123"
  }
}
)