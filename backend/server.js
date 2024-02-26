const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.json());
const cors = require('cors')
app.use(cors())
const dotenv = require('dotenv')
dotenv.config()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const userRouter = require("./api/users/userRouter");
const classRouter = require("./api/class/classRouter");
const adminRouter = require("./api/admin/adminRouter");
const payment = require('./api/payment');

app.use("/api/user", userRouter);
app.use("/api/class", classRouter);
app.use('/api/admin', adminRouter);
app.use('/payment', payment);

app.use((req,res,next)=>{
    console.log('Invalid URL.')
    console.log(req.protocol + "://" + req.get('host') + req.originalUrl);
    next("Invalid URL");
})
app.use((error, req, res, next) => {
    console.log("Error Occurred.")
    res.send(error);
})

app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT)
})