const router = require("express").Router();
const { checkToken } = require("../../auth/tokenValidation");
const { check, validationResult } = require('express-validator');
const { createClass, getCourses, getCourseInfo, attendanceList, studentCourseList, onGoingClasses, attendClass, studentSingleCourseInfo } = require("./classController");

router.post('/createClass', createClass);
router.get('/courses/:tid', getCourses);
router.post('/course', getCourseInfo);
router.get('/attendanceList/:cid', attendanceList);
router.get('/courseList/:sid', studentCourseList);
router.get('/ongoingClass/:sid', onGoingClasses);
router.post('/attendance', attendClass);
router.post('/StudentSingleCourseData', studentSingleCourseInfo)

module.exports = router;