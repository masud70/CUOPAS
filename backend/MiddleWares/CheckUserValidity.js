const jwt = require('jsonwebtoken')
const pool = require('../inc/db')

const checkLogin = (req, res, next) =>{
    const {token} = req.body
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    pool.getConnection((err, connection)=>{
        if(err) res.send({status: false})
        else{
            connection.query("SELECT student_id from student WHERE student_id = ?",[decoded.id], (err,rows)=>{
                connection.release()
                if(!err && rows.length == 1){
                    req.body.id = decoded.id;
                    next();
                }
                else{
                    res.send({status: false})
                }
            })
        }
    })
}

module.exports = checkLogin;