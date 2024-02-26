const bodyParser = require('body-parser')
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mysql = require('mysql')
const getInfo = express.Router()
const cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
getInfo.use(cors(corsOptions))
const pool = require('../inc/db')

getInfo.post('/', (req,res)=>{
    pool.getConnection((err, connection)=>{
        if(err) res.send({status: false})
        connection.query("SELECT student_id, name, name_bn, department_name as dept, session, faculty, program, hall_name FROM student NATURAL JOIN semester NATURAL JOIN department WHERE student_id = ?",[req.body.id], (err,rows)=>{
            connection.release()
            if(!err && rows.length == 1){
                res.send({status: true, data: rows})
            }
            else{
                res.send({status: false})
            }
        })
    })
})

module.exports = getInfo;