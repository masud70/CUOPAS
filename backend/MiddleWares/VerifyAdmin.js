const jwt = require('jsonwebtoken')
const pool = require('../inc/db')

const VerifyAdmin = (req, res, next) =>{
    const {token} = req.body
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    pool.getConnection((err, connection)=>{
        if(err) res.send({status: false, message: "Something went wrong. Please try again."})
        else{
            connection.query("SELECT role from student WHERE student_id = ?",[decoded.id], (err,rows)=>{
                connection.release()
                if(!err && rows.length == 1 && rows[0].role == "admin"){
                    next();
                }
                else{
                    res.send({status: false, message: "You don't have access for this."})
                }
            })
        }
    })
}

module.exports = VerifyAdmin;