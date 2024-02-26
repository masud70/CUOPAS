const pool = require('../inc/db')

const departmentList = (req,res)=>{
    pool.getConnection((err, connection)=>{
        if(err) res.send({status: false})
        connection.query("SELECT faculty_id AS value, faculty_name AS label FROM faculty", (err,rows)=>{
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