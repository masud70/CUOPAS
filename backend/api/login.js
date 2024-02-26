const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
const Login = express.Router()
const cors = require('cors')
var corsOptions = {
    origin: process.env.ACCESS_ORIGIN,
    optionsSuccessStatus: 200
}
Login.use(cors(corsOptions))
const pool = require('../inc/db')

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("admin", salt, function(err, hash) {
        console.log(hash);
        bcrypt.compare("admin", hash, function(err, res) {
            console.log(res);
        });
    });
});
Login.post('/', (req,res)=>{
    pool.getConnection((err, connection)=>{
        if(err) res.send({status: false, type: 'error', message: "Something went wrong."});
        connection.query("SELECT student_id, password, role from student WHERE student_id = ?",[req.body.id], (err,rows)=>{
            connection.release()
            if(!err && rows.length == 1){
                bcrypt.compare(req.body.password, rows[0].password, function(err, result) {
                    if(result && !err){
                        
                        token = jwt.sign({id: rows[0].student_id, role: rows[0].role}, process.env.SECRET_KEY);
                        res.send({status: true, type: "success", role: rows[0].role, token: token, message: "Authentication successful!"});
                    }else{
                        res.send({status: false, type: 'error', message: "Authentication failed."});
                    }
                });
            }else{
                res.send({status: false, type: 'error', message: "Authentication failed."});
            }
        })
    })
})

module.exports = Login;