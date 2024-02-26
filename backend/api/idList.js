const pool = require('../inc/db')

const departmentList = (req,res)=>{
    pool.getConnection((err, connection)=>{
        if(err) res.send({status: false})
        if(req.body.studentId != undefined && req.body.studentId != "" && parseInt(req.body.studentId) != NaN){
            connection.query("SELECT student_id as id , name as name, department_name AS dept FROM student NATURAL JOIN semester NATURAL JOIN department WHERE student_id LIKE ('?%') AND semester_id = ?", [parseInt(req.body.studentId), parseInt(req.body.semesterId)] , (err,rows)=>{
                connection.release()
                if(!err){
                    res.send({status: true, list: rows})
                }
                else{
                    res.send({status: false})
                }
            })
        }else{
            connection.query("SELECT student_id as id , name as name, department_name AS dept FROM student NATURAL JOIN semester NATURAL JOIN department WHERE semester_id = ?", [parseInt(req.body.semesterId)] , (err,rows)=>{
                connection.release()
                if(!err){
                    res.send({status: true, list: rows})
                }
                else{
                    res.send({status: false})
                }
            })
        }
        
    })
}

module.exports = departmentList;