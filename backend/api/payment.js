const express = require('express');
const router = express.Router();
const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = '1tkex60aa00a3f3092';
const store_passwd = '1tkex60aa00a3f3092@ssl';
const is_live = false 

router.get('/', (req, res) => {
    const info = {
        name: "Masud",
        email: "mdmasud@gmail.com",
        phone: "01710089091",
        amount: 5000
    }
    const trn_id = "CUTRAN"+ new Date().valueOf();
    console.log(trn_id)
    const data = {
        total_amount: info.amount,
        currency: 'BDT',
        tran_id: trn_id, // use unique tran_id for each api call
        success_url: 'http://localhost:5000/payment/success',
        fail_url: 'http://localhost:5000/payment/failure',
        cancel_url: 'http://localhost:5000/payment/cancel',
        ipn_url: 'http://localhost:5000/payment/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: info.name,
        cus_email: info.email,
        cus_add1: 'Chittagong',
        cus_add2: 'Chittagong',
        cus_city: 'Chittagong',
        cus_state: 'Chittagong',
        cus_postcode: '4331',
        cus_country: 'Bangladesh',
        cus_phone: info.phone,
        cus_fax: '01711111111',
        ship_name: info.name,
        ship_add1: 'Chittagong',
        ship_add2: 'Chittagong',
        ship_city: 'Chittagong',
        ship_state: 'Chittagong',
        ship_postcode: "4331",
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then(apiResponse => {
        console.log(apiResponse)
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.redirect(GatewayPageURL)
        console.log('Redirecting to: ', GatewayPageURL)
    });
});

router.post("/success", (req, res)=>{
    return res.status(200).json({
        data: req.body
    })
})

router.post("/failure", (req, res)=>{
    return res.status(400).json({
        data: req.body
    })
})

router.post("/ipn", (req, res)=>{
    return res.status(400).json({
        data: req.body
    })
})

router.post("/cancel", (req, res)=>{
    return res.status(400).json({
        data: req.body
    })
})

module.exports = router ;