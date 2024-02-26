var bcrypt = require('bcryptjs');
const pool = require('../inc/db')

const addData = (req,res)=>{
    const {student_id, phone, name, department_id, faculty} = req.body.data;
    if(student_id.length >= 8  && phone.length >= 11 && phone.length <= 15 && name && department_id){
        pool.getConnection((err, connection)=>{
            if(err) res.send({status: false, message: "Something went wrong."})
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash("cu12345678", salt, function(err, hash) {
                    if(err) res.send({status: false, message: "Something went wrong."});
                    req.body.data.password = hash;
                    connection.query("INSERT INTO student SET ?",[req.body.data], (err,rows)=>{
                        connection.release()
                        if(!err){
                            res.send({status: true, message: 'User added successfully!'})
                        }
                        else{
                            res.send({status: false, message: err.message})
                        }
                    })
                });
            });
        })
    }else{
        res.send({status: false, message: "Mandatory fields must be filled."})
    }
}

module.exports = addData;