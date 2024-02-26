const express = require('express')
const Payment = express.Router();
const CreatePayment = require('../api/Test')


Payment.post('/createPayment', CreatePayment)

module.exports = Payment;