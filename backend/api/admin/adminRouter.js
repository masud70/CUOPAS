const router = require("express").Router();
const { checkToken } = require("../../auth/tokenValidation");
const { check, validationResult } = require('express-validator');
const { semesterList, semesterWiseIdList, InfoWithIdList } = require("./adminController");

router.get("/semesterList/:id", semesterList);
router.get('/semesterWiseIdList/:sid', semesterWiseIdList);
router.post('/infoWithIds', InfoWithIdList);


module.exports = router;