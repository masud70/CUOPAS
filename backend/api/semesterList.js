const pool = require('../inc/db')

const departmentList = (req,res)=>{
    pool.getConnection((err, connection)=>{
        if(err) res.send({status: false})
        connection.query("SELECT semester_id as value , semester_title as label FROM semester NATURAL JOIN department WHERE department_id = ?",[req.params.deptId], (err,rows)=>{
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