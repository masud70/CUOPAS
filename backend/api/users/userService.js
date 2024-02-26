const SSLCommerzPayment = require('sslcommerz-lts')
const pool = require("../../inc/db");

module.exports = {
    getStudentData: (id, callBack) => {
        pool.query("SELECT student_id as id, user_id, name, name_bangla, email, phone, dob, image, religion, father, mother, nationality, present_address, permanent_address, marital_status, password, status, role, session, department_name, department_id, alloted_hall, semester_id FROM student NATURAL JOIN user NATURAL JOIN department WHERE user_id = ?",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getTeacherData: (id, callBack) => {
        pool.query("SELECT teacher_id as id, user_id, name, name_bangla, email, phone, dob, image, religion, father, mother, nationality, present_address, permanent_address, marital_status, password, status, role, department_name, department_id FROM teacher NATURAL JOIN user NATURAL JOIN department WHERE user_id = ?",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserData: (id, callBack) => {
        pool.query("SELECT user_id, name, name_bangla, email, phone, dob, image, religion, father, mother, nationality, present_address, permanent_address, marital_status, password, status, role, department_name, department_id FROM user user_id = ?",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    createUser: (data, callBack) => {
        pool.query("INSERT INTO USER (name, name_bangla, email, phone, gender, dob, role, status, password ) values(?,?,?,?,?,?,?,?,?)",
            [
                data.name,
                data.name_bangla,
                data.email,
                data.phone,
                data.gender,
                data.dob,
                data.role,
                data.status,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    addStudent: (data, callBack) =>{
        pool.query("INSERT INTO student (student_id, user_id, semester_id, session, department_id, alloted_hall) VALUES (?,?,?,?,?,?)",
            [
                data.student_id,
                data.user_id,
                data.semester_id,
                data.session,
                data.department_id,
                data.alloted_hall
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    addTeacher: (data, callBack) =>{
        pool.query("INSERT INTO teacher (teacher_id, user_id, department_id, rank) VALUES (?,?,?,?)",
            [
                data.teacher_id,
                data.user_id,
                data.department_id,
                data.rank
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByEmail: (email, callBack) => {
        pool.query("SELECT name, name_bangla, email, phone, dob, image, religion, father, mother, nationality, present_address, permanent_address, marital_status, password, status, role FROM user WHERE email = ?",[email],
        (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getStudentById: (id, callBack) => {
        pool.query("SELECT student_id, user_id, name, name_bangla, email, phone, dob, image, religion, father, mother, nationality, present_address, permanent_address, marital_status, password, status, role, session, department_id, alloted_hall, semester_id FROM student NATURAL JOIN user WHERE student_id = ?",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getTeacherById: (id, callBack) => {
        pool.query("SELECT * FROM teacher NATURAL JOIN user WHERE teacher_id = ?",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserById: (id, callBack) => {
        pool.query("SELECT * FROM user WHERE user_id = ?",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getStudents: callBack => {
        pool.query("SELECT student_id,name,name_bangla,email,phone FROM user NATURAL JOIN student",[],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getTeachers: callBack => {
        pool.query("SELECT teacher_id,name,name_bangla,email,phone FROM user NATURAL JOIN teacher",[],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query("UPDATE user SET ?",[data],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateStudent: (data, callBack) => {
        pool.query("UPDATE student SET ?",[data],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateTeacher: (data, callBack) => {
        pool.query("UPDATE teacher SET ?",[data],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteUser: (id, callBack) => {
        pool.query("DELETE FROM user WHERE user_id = ?",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    createPayment: async (data, callBack) => {
        const mysql = require('mysql2');
        // create the pool
        const pool2 = mysql.createPool({host:'localhost', user: 'root', database: 'cudatabase', password: ''});
        // now get a Promise wrapped instance of that pool
        const promisePool = pool2.promise();
        console.log(data);
        let conn = null;
        conn = await promisePool.getConnection();
        try{
            await conn.beginTransaction();
            var sql = "INSERT INTO payment_purpose (purpose_title, department_id, created_by, created_at) VALUES (?,?,?,?)";
            const [response, meta] = await conn.query(sql, [data.purpose_title, data.department_id, data.created_by, data.created_at]);
            if(!meta){
                const purpose_id = response.insertId;
                sql = "INSERT INTO payment (purpose_id, student_id, due_date) VALUES (?,?,?)";
                for(let i=0; i<data.idList.length; i++){
                    const [result, error] = await conn.query(sql, [purpose_id, data.idList[i], data.due_date]);
                    if(!error){
                        const payment_id = result.insertId;
                        console.log("PID-"+payment_id)
                        let sql1 = "INSERT INTO payment_details (payment_id, details, amount) VALUES (?,?,?)";
                        for(let j=0; j<data.fields.length; j++){
                            const [result1, error1] = await conn.query(sql1, [payment_id, data.fields[j].name, data.fields[j].value]);
                            if(!error1){
                                console.log(j);
                                console.log(result1);
                            }
                        }
                    }
                }
            }
            await conn.commit();
            return callBack(null,{status: false});
        }catch(e){
            if (conn) await conn.rollback();
            return callBack(e)
        }finally{
            if (conn) await conn.release();
        }
    },
    getAllPaymentUser: (id, callBack) => {
        pool.query("SELECT * FROM (SELECT payment_id, purpose_id, student_id, due_date, payment_status, payment_date, purpose_title, SUM(amount) AS total FROM payment NATURAL JOIN payment_purpose NATURAL JOIN payment_details GROUP BY payment_id) AS T WHERE T.student_id = ?",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserInfoByPaymentId: (id, callBack) => {
        pool.query("SELECT name, department_name, student_id, session, due_date, payment_status FROM payment NATURAL JOIN student INNER JOIN user ON user.user_id = student.user_id NATURAL JOIN department WHERE payment_id = ?",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getPaymentDetailsByPaymentId: (id, callBack) => {
        pool.query("SELECT details, amount FROM payment NATURAL JOIN payment_details WHERE payment_id = ?",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    payFunction: (res) => {
        const store_id = '1tkex60aa00a3f3092';
        const store_passwd = '1tkex60aa00a3f3092@ssl';
        const is_live = false 
        const info = {
            name: "Masud",
            email: "mdmasud@gmail.com",
            phone: "01710089091",
            amount: 5000,
            uid: 1,
            pid: 5
        }
        const trn_id = "CUTRAN"+ new Date().valueOf();
        console.log(trn_id)
        const data = {
            total_amount: info.amount,
            currency: 'BDT',
            tran_id: trn_id, // use unique tran_id for each api call
            success_url: 'http://localhost:5000/payment/success',
            fail_url: 'http://localhost:5000/payment/failure',
            cancel_url: 'http://localhost:5000/payment/cancel',
            ipn_url: 'http://localhost:5000/payment/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: info.name,
            cus_email: info.email,
            cus_add1: 'Chittagong',
            cus_add2: 'Chittagong',
            cus_city: 'Chittagong',
            cus_state: 'Chittagong',
            cus_postcode: '4331',
            cus_country: 'Bangladesh',
            cus_phone: info.phone,
            cus_fax: '01711111111',
            ship_name: info.name,
            ship_add1: 'Chittagong',
            ship_add2: 'Chittagong',
            ship_city: 'Chittagong',
            ship_state: 'Chittagong',
            ship_postcode: "4331",
            ship_country: 'Bangladesh',
            value_a: info.uid,
            value_b: info.pid
        };
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.redirect(GatewayPageURL);
            console.log('Redirecting to: ', GatewayPageURL);
        });
    },
    ipnHandler: (data, callBack) =>{
        pool.query("INSERT INTO `payment_details`(`payment_id`, `details`, `amount`) VALUES (17,'ipn',100)",
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, data);
            }
        );
    },
    storePaymentData: (data, callBack) => {

    }
};
