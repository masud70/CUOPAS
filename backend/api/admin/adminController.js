const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const { getSemesterList, getSemesterWiseIdList, getInfoWithIdList } = require("./adminService");
  
module.exports = {
    semesterList: (req, res) => {
        let id = req.params.id
        getSemesterList(id, (error, result) => {
            if (error || !result) {
                return res.json({
                    status: false,
                    message: "Data not found."
                });
            }else{
                return res.json({
                    status: true,
                    data: result
                });
            }
        })
    },
    semesterWiseIdList: (req, res) => {
        getSemesterWiseIdList(req.params.sid, (error, result)=>{
            if (error || !result) {
                return res.json({
                    status: false,
                    message: "Data not found."
                });
            }else{
                return res.json({
                    status: true,
                    data: result
                });
            }
        })
    },
    InfoWithIdList: (req, res) => {
        getInfoWithIdList(req.body.idList, (error, result)=>{
            if (error || !result) {
                return res.json({
                    status: false,
                    message: "Data not found."
                });
            }else{
                return res.json({
                    status: true,
                    data: result
                });
            }
        })
    }
};
  