const jwt = require('jsonwebtoken')
const pool = require('../inc/db')

const CheckLogin = (req,res) => {
    const {token} = req.body
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    pool.getConnection((err, connection)=>{
        if(err) res.send({status: false})
        connection.query("SELECT student_id, role from student WHERE student_id = ?",[decoded.id], (err,rows) => {
            connection.release()
            if(!err && rows.length == 1){
                res.send({status: true, role: rows[0].role})
            }
            else{
                res.send({status: false})
            }
        })
    })
}

module.exports = CheckLogin;