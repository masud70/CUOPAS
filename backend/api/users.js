const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const users = express.Router()
const cors = require('cors')
users.use(cors())

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'csecu'
})

users.get('/', cors(corsOptions), (req,res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log(`Connected as id ${connection.threadId}`)
        connection.query("SELECT * from student", (err,rows)=>{
            connection.release()

            if(!err){
                res.send(rows)
            }
            else{
                console.log(err)
            }
        })
    })
})

users.post('/:id', (req,res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log(req.params.id)
        connection.query("SELECT * from student WHERE student_id = ?",[req.params.id], (err,rows)=>{
            connection.release()
            if(!err){
                res.send(rows)
            }
            else{
                res.send(err)
            }
        })
    })
})

module.exports = users;