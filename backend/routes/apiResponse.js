const express = require('express')
const apiResponse = express.Router();
const departmentList = require('../api/departmentList')
const facultyList = require('../api/facultyList')
const semesterList = require('../api/semesterList')
const idList = require('../api/idList')



apiResponse.get('/departmentList', departmentList)
apiResponse.get('/facultyList', facultyList)
apiResponse.get('/semesters/:deptId', semesterList)
apiResponse.post('/idList', idList)

module.exports = apiResponse;