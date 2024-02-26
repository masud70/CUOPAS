const { application } = require('express');
const express = require('express');
const payNow = express.Router();
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = '1tkex60aa00a3f3092'
const store_passwd = '1tkex60aa00a3f3092@ssl'
const is_live = false //true for live, false for sandbox

payNow.get('/', (req, res) => {
    console.log("OKKK")
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://localhost:5000/api/success',
        fail_url: 'http://localhost:5000/api/failure',
        cancel_url: 'http://localhost:5000/api/cancel',
        ipn_url: 'http://localhost:5000/api/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        console.log(apiResponse)
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.redirect(GatewayPageURL)
        console.log('Redirecting to: ', GatewayPageURL)
    });
});

payNow.post("/success", async (req, res)=>{
    return res.status(200).json({
        data: "success"
    })
})

payNow.post("/failure", async (req, res)=>{
    return res.status(400).json({
        data: "failed"
    })
})
payNow.post("/cancel", async (req, res)=>{
    return res.status(400).json({
        data: "cancelled"
    })
})

module.exports = payNow ;