const pool = require('../inc/db')

const departmentList = (req,res)=>{
    pool.getConnection((err, connection)=>{
        if(err) res.send({status: false})
        connection.query("SELECT department_id AS value, department_name AS label FROM department WHERE 1", (err,rows)=>{
            connection.release()
            if(!err){
                res.send({status: true, list: rows})
            }
            else{
                res.send({status: false})
            }
        })
    })
}

module.exports = departmentList;