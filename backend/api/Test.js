const pool = require('../inc/db')

const Test = async (req,res) => {
    let response = {};
    let purposeId = 0;
    let ids = req.body.idList;
    let fields = req.body.fields;
    console.log('Response Started...')
    console.log(req.body)

    pool.getConnection((err, connection)=>{
        console.log('Connection Started......');
        if(err){
            console.log('Connection Creation Error.');
            res.send({status: false});
        }else{
            if(req.body.title.__isNew__){
                console.log('NEW')
                connection.query("INSERT INTO purposes (title, department_id) VALUES (?,?)",[req.body.title.label, req.body.department_id], (err,result,rows)=>{
                    if(!err){
                        console.log('Inserted')
                        purposeId = result.insertId;
                        insertData(1,ids,fields, purposeId, connection).then(rr=>{
                            console.log(rr)
                            response = {status: true, message: "Payment Created"};
                            connection.release();
                            res.send(response)
                        });
                    }
                    else{
                        response = {status: false, message: "Internal Server Error. Please Try Again."};
                        connection.release();
                        res.send(response)
                    }
                })
            }else{
                purposeId = req.body.title.pid;
                insertData(1,ids,fields, purposeId, connection).then(rr=>{
                    console.log(rr)
                    response = {status: true, message: "Payment Created"};
                    connection.release();
                    res.send(response)
                });
            }
        }
    })
}

const insertData = async (id, ids, fields, purposeId, connection) =>{
    let successArray = [];
    let unsuccessArray = [];

    console.log('Entered Here... from '+ id)
    console.log("Purpose ID = "+purposeId)
    return new Promise(resolve => {
        for(let i=0; i<ids.length; i++){
            connection.query("INSERT INTO payment (purpose_id, student_id, date) VALUES (?,?,?)",[purposeId, ids[i], new Date().toLocaleString("en-US")], (err,result,rows)=>{
                if(!err){
                    paymentId = result.insertId;
                    insertIndividual(fields, paymentId, connection).then(resolved=>{
                        successArray.push(ids[i]);
                    })
                }else{
                    unsuccessArray.push(ids[i]);
                }
            })
        }
        resolve('Resolved now')
    });
};

const insertIndividual = async (fields, paymentId, connection) => {
    return new Promise(resolve => {
        let successJ = 0;
        for(let j = 0; j<fields.length; j++){
            connection.query("INSERT INTO paymentdetail (payment_id, details, amount) VALUES (?,?,?)",[paymentId, fields[j].name, fields[j].value], (err,result,rows)=>{
                if(!err){
                    successJ++;
                }else{
                    console.log(err)
                }
                if(successJ == fields.length) resolve({status: true})
                else{
                    resolve({status: successJ})
                }
            })
        }
    });
}

module.exports = Test;