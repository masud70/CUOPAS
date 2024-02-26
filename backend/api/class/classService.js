const pool = require("../../inc/db");

module.exports = {
    newClass: (data, callBack) => {
        pool.query("INSERT INTO class ( course_id, teacher_id, start, end, class_code ) values(?,?,?,?,?)",
            [
                data.courseId,
                data.teacherId,
                data.start,
                data.end,
                data.classCode
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAllCourse: (id, callBack) => {
        pool.query("SELECT course_id,course_name, course_credit, image, course_code, semester_name, semester_id, department_name FROM course NATURAL JOIN instruct NATURAL JOIN teacher NATURAL JOIN semester NATURAL JOIN department WHERE teacher_id = ?",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getCourseInfoTeacher: async (data, callBack) => {
        const mysql = require('mysql2');
        const pool2 = mysql.createPool({host:'localhost', user: 'root', database: 'cudatabase', password: ''});
        const promisePool = pool2.promise();
        let conn = null;
        conn = await promisePool.getConnection();
        try{
            var sql = "SELECT *, (SELECT COUNT(*) AS total FROM student NATURAL JOIN semester NATURAL JOIN course WHERE course_id = ?) AS total FROM semester NATURAL JOIN course WHERE course_id = ?";
            const [response, meta] = await conn.query(sql, [data.cid, data.cid]);
            if(meta){
                var sql2 = "SELECT * FROM (SELECT student_id, status, class.class_id, course_id, teacher_id, start, end, class_code, isActive, COUNT(attendance.class_id) as present FROM attendance RIGHT JOIN class ON class.class_id = attendance.class_id GROUP BY class.class_id) AS T WHERE T.course_id = ? AND T.teacher_id = ?";
                const [response2, meta2] = await conn.query(sql2, [data.cid, data.tid]);
                if(meta2){
                    return callBack(null, {courseData: response, classes: response2});
                }
            }
            return callBack(null,{status: false});
        }catch(e){
            return callBack(e)
        }
    },
    getAttendanceList: (id, callBack) => {
        pool.query("SELECT * FROM attendance NATURAL JOIN (SELECT name, student_id FROM user NATURAL JOIN student) AS T WHERE class_id = ?",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getStudentCourseList: (id, callBack) => {
        pool.query("SELECT name, user.image, TT.course_id, course_name, course_code, course_credit, semester_id, TT.image AS cover, TT.teacher_id FROM user RIGHT JOIN (SELECT user_id, T.course_id, course_name, course_code, course_credit, semester_id, T.image, T.teacher_id FROM teacher RIGHT JOIN (SELECT course.course_id, course_name, course_code, course_credit, semester_id, image, instruct.teacher_id FROM instruct RIGHT JOIN course ON course.course_id = instruct.course_id WHERE semester_id = ?) AS T ON teacher.teacher_id = T.teacher_id) AS TT ON user.user_id = TT.user_id",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getOngoingClasses: (id, callBack) => {
        pool.query("SELECT name, course_id, semester_id, class_id, course_name, start, end, isActive FROM user INNER JOIN (SELECT teacher.user_id, course_id, semester_id, course_name, class_id, start, end, isActive FROM teacher INNER JOIN (SELECT course_id, semester_id, course_name, teacher_id, start, end, class_id, isActive FROM department NATURAL JOIN semester NATURAL JOIN course NATURAL JOIN class WHERE end >= NOW() AND semester_id = ?) AS T ON teacher.teacher_id = T.teacher_id) AS TT ON user.user_id = TT.user_id",[id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    attendance: (data, callBack) => {
        pool.query("INSERT INTO attendance (class_id, student_id, status) SELECT ?, ?, 1 FROM DUAL WHERE (? = (SELECT class_code FROM class WHERE class_id = ?))",
        [
            data.classId,
            data.studentId,
            data.classCode,
            data.classId
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getStudentSingleCourseInfo: async (data, callBack) => {
        const mysql = require('mysql2');
        const pool2 = mysql.createPool({host:'localhost', user: 'root', database: 'cudatabase', password: ''});
        const promisePool = pool2.promise();
        let conn = null;
        conn = await promisePool.getConnection();
        try{
            var sql = "SELECT name, course_credit, course.image, course_code, course.course_id, course.course_name, course.semester_id, user.image AS teacher_image, teacher.teacher_id FROM user NATURAL JOIN teacher NATURAL JOIN instruct RIGHT JOIN course ON course.course_id = instruct.course_id WHERE course.course_id = ?";
            const [response, meta] = await conn.query(sql, [data.cid]);
            if(meta){
                var sql2 = "SELECT * FROM (SELECT * FROM attendance WHERE student_id = ?) AS T1 RIGHT JOIN (SELECT * FROM class WHERE course_id = ?) AS T2 ON T1.class_id = T2.class_id";
                const [response2, meta2] = await conn.query(sql2, [data.sid, data.cid]);
                if(meta2){
                    return callBack(null, {courseData: response, attendanceData: response2});
                }
            }
            return callBack(null,{status: false});
        }catch(e){
            return callBack(e)
        }
    },
};
