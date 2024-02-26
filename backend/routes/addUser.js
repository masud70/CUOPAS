const express = require('express')
const router = express.Router();
const {uploadSingle} = require('../MiddleWares/userController')
const addData = require('../api/addData')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())
const verifyAdmin = require('../MiddleWares/VerifyAdmin')

router.post('/', verifyAdmin, addData)

module.exports = router;