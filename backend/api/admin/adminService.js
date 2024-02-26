const pool = require("../../inc/db");
const syncPool = require("../../inc/syncDb");
  
module.exports = {
    getSemesterList: (id, callBack) => {
        pool.query("SELECT semester_id, semester_name FROM user NATURAL JOIN department NATURAL JOIN semester WHERE user_id = ?",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSemesterWiseIdList: (sid, callBack) => {
        pool.query("SELECT name, department_name, student_id, semester_name FROM user NATURAL JOIN student NATURAL JOIN department NATURAL JOIN semester WHERE semester_id = ?",[sid],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getInfoWithIdList: (ids, callBack) => {
        pool.query("SELECT name, department_name, student_id, semester_name FROM user NATURAL JOIN student NATURAL JOIN department NATURAL JOIN semester WHERE student_id IN (?)",[ids],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};
  