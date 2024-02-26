const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
const dotenv = require('dotenv')
dotenv.config()
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
const api = require('./api/paynow')
const Login = require('./api/login')
const users = require('./api/users')
const checkUser = require('./MiddleWares/CheckUserValidity')
const getInfo = require('./api/getInfo')
const addUser = require('./routes/addUser')
const apiResponse = require('./routes/apiResponse')
const Payment = require('./routes/Payment')
const CheckLogin = require('./api/checkLogin')

app.use('/addUser', addUser)
app.use('/api', apiResponse);
app.use('/paynow', api);
app.post('/api/success', (req, res) => {
    res.send(req.body);
});
app.post('/api/failure', (req, res) => {
    res.send(req.body);
});
app.post('/checkLogin', CheckLogin);
app.use('/getLogin', Login);

app.use('/getInfo', checkUser, getInfo);
app.use('/payment', Payment)

app.listen(process.env.PORT, () => {
    console.log("Server started on port =" + process.env.PORT)
})