const pool = require('../inc/db')

const CreatePayment = async (req,res) => {
    let response = {};
    let purposeId = 0;
    let ids = req.body.idList;
    let fields = req.body.fields;
    console.log(req.body)

    pool.getConnection((err, connection)=>{
        if(err){
            response = {status: false};
            connection.release();
            res.send(response);
        }else{
            if(req.body.title.__isNew__){
                connection.query("INSERT INTO purposes (title, department_id) VALUES (?,?)",[req.body.title.label, req.body.department_id], (err,resp,rows)=>{
                    if(!err){
                        purposeId = resp.insertId;
                        insertFunction(ids, fields, purposeId, connection, res);
                        console.log(response)
                        connection.release();
                        res.send(response);
                    }
                    else{
                        console.log(err)
                        response = {status: false, message: "Internal Server Error. Please Try Again."};
                    }
                })
            }else{
                purposeId = req.body.title.pid;
                insertFunction(ids, fields, purposeId, connection, res)
                console.log(response)
                connection.release();
                res.send(response);
            }
        }
    })
}

const insertFunction = async (ids, fields, purposeId, connection, res) =>{
    let paymentId = 0;
    let successArray = [];
    let unsuccessArray = [];
    let response = {};
    
    if(purposeId != 0){
        await myFun1(ids, fields, purposeId, connection, res).then(respn=>{
            response = respn;
            connection.release();
            res.send(response);
        })
    }else{
        response = {status: false, message: "Internal Server Error. Please Try Again."};
        connection.release();
        res.send(response);
    }
}

const myFun1 = async (ids, fields, purposeId, connection, res) => {
    let paymentId = 0;
    let successArray = [];
    let unsuccessArray = [];
    let response = {};

    for(let i=0; i<ids.length; i++){
        await connection.query("INSERT INTO payment (purpose_id, student_id, date) VALUES (?,?,?)",[purposeId, ids[i], new Date().toLocaleString("en-US")], (err,resp,rows)=>{
            if(!err){
                paymentId = resp.insertId;
                console.log(paymentId)
                if(paymentId != 0){
                    let successJ = 0;
                    myFun(connection, fields).then(result=>{
                        successJ = result;
                    })
                    if(successJ == fields.length){
                        successArray.push(ids[i]);
                    }else{
                        unsuccessArray.push(ids[i]);
                    }
                }else{
                    unsuccessArray.push(ids[i]);
                }
            }
            else{
                console.log(err)
                unsuccessArray.push(ids[i]);
            }
        })
    }
    response = {status: true, successLength: successArray.length, success: successArray, errorLength: unsuccessArray.length, error: unsuccessArray};
    return response;
}

const myFun = async (connection, fields) => {
    let successJ = 0;
    for(let j = 0; j<fields.length; j++){
        await connection.query("INSERT INTO paymentdetail (payment_id, details, amount) VALUES (?,?,?)",[paymentId, fields[j].name, fields[j].value], (err,resp,rows)=>{
            if(!err){
                successJ++;
            }
        })
    }
    return successJ;
}

module.exports = CreatePayment;