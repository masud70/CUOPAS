const { validationResult } = require('express-validator');
const { getAllCourse, getCourseInfoTeacher, getAttendanceList, getStudentCourseList, getOngoingClasses, attendance, getStudentSingleCourseInfo, createClass, newClass } = require("./classService");
  
module.exports = {
    createClass: (req, res) => {
        let body = req.body;
        let classCode = 0;
        while(classCode%1000 === 0){
            classCode = Math.floor((Math.random() * 100000));
        }
        body.classCode = classCode.toString();
        newClass(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    status: false,
                    message: "Something went wrong."
                });
            }else{
                return res.status(200).json({
                    status: true,
                    code: classCode,
                    message: "Class Created successfully."
                });
            }
        });
    },
    getCourses: (req, res) => {
        getAllCourse(req.params.tid, (err, result) => {
            if (err) {
                return res.status(200).json({
                    status: false,
                    message: "Data not found."
                });
            }else{
                return res.status(200).json({
                    status: true,
                    data: result
                });
            }
        })
    },
    getCourseInfo: (req, res) => {
        getCourseInfoTeacher(req.body, (error, data) => {
            if (error) {
                return res.status(200).json({
                    status: false,
                    message: "Data not found."
                });
            }else{
                return res.status(200).json({
                    status: true,
                    data
                });
            }
        })
    },
    attendanceList: (req, res) => {
        getAttendanceList(req.params.cid, (error, data) => {
            if (error) {
                return res.status(200).json({
                    status: false,
                    message: "Data not found."
                });
            }else{
                return res.status(200).json({
                    status: true,
                    data
                });
            }
        });
    },
    studentCourseList: (req, res) => {
        getStudentCourseList(req.params.sid, (error, data) => {
            if (error) {
                return res.status(200).json({
                    status: false,
                    message: "Data not found."
                });
            }else{
                return res.status(200).json({
                    status: true,
                    data
                });
            }
        });
    },
    onGoingClasses: (req, res) => {
        getOngoingClasses(req.params.sid, (error, data) => {
            if (error) {
                return res.status(200).json({
                    status: false,
                    message: "Data not found."
                });
            }else{
                return res.status(200).json({
                    status: true,
                    data
                });
            }
        })
    },
    attendClass: (req, res) =>{
        const data = req.body;
        attendance(data, (error, result) => {
            if (error || !result.affectedRows) {
                return res.status(200).json({
                    status: false,
                    message: "Failed. Try again."
                });
            }else{
                return res.status(200).json({
                    status: true,
                    message: "Attendance recorded."
                });
            }
        })
    },
    studentSingleCourseInfo: (req, res) => {
        const data = req.body;
        getStudentSingleCourseInfo(data, (error, result)=>{
            if (error) {
                return res.status(200).json({
                    status: false,
                    message: "Data not found."
                });
            }else{
                return res.status(200).json({
                    status: true,
                    result
                });
            }
        });
    },
};
  