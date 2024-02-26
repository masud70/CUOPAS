const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const {
  createUser,
  addStudent,
  addTeacher,
  getUserByEmail,
  getStudentById,
  getTeacherById,
  getUserById,
  getStudents,
  getTeachers,
  updateUser,
  updateStudent,
  updateTeacher,
  deleteUser,
  createPayment,
  getUserData,
  getStudentData,
  getTeacherData,
  getAllPaymentUser,
  getUserInfoByPaymentId,
  getPaymentDetailsByPaymentId,
  payFunction,
  ipnHandler,
} = require("./userService");

module.exports = {
    login: (req, res) => {
    const body = req.body;
    const ret = {};
    getStudentById(body.id, (err, results) => {
      if (err) {
        console.log(err);
        next(err);
      }
      if (!results) {
        getTeacherById(body.id, (err, results) => {
          if (err) {
            console.log(err);
            next(err);
          }
          if (!results) {
            return res.json({
              status: false,
              data: "User not found.",
            });
          }
          const result = compareSync(body.password, results.password);
          if (result) {
            results.password = undefined;
            const jsonToken = sign(
              { result: results },
              process.env.SECRET_KEY,
              {
                expiresIn: "7d",
              }
            );
            return res.json({
              status: true,
              message: "login successfully",
              result: results,
              token: jsonToken,
            });
          } else {
            return res.json({
              status: false,
              message: "Invalid credential.",
            });
          }
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsonToken = sign({ result: results }, process.env.SECRET_KEY, {
          expiresIn: "7d",
        });
        return res.json({
          status: true,
          message: "login successfully",
          result: results,
          token: jsonToken,
        });
      } else {
        return res.json({
          status: false,
          message: "User not found.",
        });
      }
    });
    },
    getData: (req, res) => {
        const body = req.decoded.result;
        let id = body.user_id;
        const role = body.role.split(",");
        if (role.includes("student")) {
        getStudentData(id, (err, results) => {
            if (err) {
            // console.log(err);
            return res.status(200).json({
                status: false,
                message: "Something went wrong.",
            });
            } else {
            // console.log(results);
            if (results) {
                return res.json({
                status: true,
                result: results,
                });
            } else {
                return res.json({
                status: false,
                message: "Data not found.",
                });
            }
            }
        });
        } else if (role.includes("teacher")) {
        getTeacherData(id, (err, results) => {
            if (err) {
            // console.log(err);
            return res.status(200).json({
                status: false,
                message: "Something went wrong.",
            });
            } else {
            // console.log(results);
            if (results) {
                return res.json({
                status: true,
                result: results,
                });
            } else {
                return res.json({
                status: false,
                message: "Data not found.",
                });
            }
            }
        });
        } else {
        getUserData(id, (err, results) => {
            if (err) {
            // console.log(err);
            return res.status(500).json({
                status: false,
                message: "Something went wrong.",
            });
            } else {
            // console.log(results);
            if (results) {
                return res.json({
                status: true,
                result: results,
                });
            } else {
                return res.json({
                status: false,
                message: "Data not found.",
                });
            }
            }
        });
        }
    },
    createStudent: (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
        res.send({ status: false, message: "Data validation failed!", error });
        next("Data validation failed!");
        }

        let body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync("cu@123456", salt);
        createUser(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
            status: false,
            message: "Something went wrong.",
            });
        } else {
            req.body.user_id = results.insertId;
            body = req.body;
            addStudent(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                status: false,
                message: "Something went wrong.",
                });
            }
            return res.status(200).json({
                status: true,
                data: results,
                message: "Student added successfully.",
            });
            });
        }
        });
    },
    createTeacher: (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
        res.send({ status: false, message: "Data validation failed!", error });
        next("Data validation failed!");
        }
        let body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync("cu@123456", salt);
        createUser(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
            status: false,
            message: "Something went wrong.",
            });
        } else {
            req.body.user_id = results.insertId;
            body = req.body;
            addTeacher(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                status: false,
                message: "Something went wrong.",
                });
            }
            return res.status(200).json({
                status: true,
                data: results,
                message: "Teacher added successfully.",
            });
            });
        }
        });
    },
    getUserByUserId: (req, res, next) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
        if (err) {
            console.log(err);
            next("Server error occurred.");
        } else if (!results) {
            return res.json({
            status: false,
            message: "Record not Found",
            });
        } else {
            results.password = undefined;
            return res.json({
            status: true,
            data: results,
            });
        }
        });
    },
    getUserByUserEmail: (req, res, next) => {
        const email = req.body.email;
        getUserByEmail(email, (err, results) => {
        if (err) {
            console.log(err);
            next(err);
        } else if (!results) {
            return res.json({
            status: false,
            message: "Record not Found",
            });
        } else {
            results.password = undefined;
            return res.json({
            status: true,
            data: results,
            });
        }
        });
    },
    getAllStudents: (req, res, next) => {
        getStudents((err, results) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            return res.json({
            status: true,
            data: results,
            });
        }
        });
    },
    getAllTeachers: (req, res, next) => {
        getTeachers((err, results) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            return res.json({
            status: true,
            data: results,
            });
        }
        });
    },
    updateStudent: (req, res, next) => {
        const body = req.body;
        const salt = genSaltSync(10);
        if (body.password) {
        body.password = hashSync(body.password, salt);
        }
        updateUser(body, (err, results) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            updateStudent(body, (err, results) => {
            if (err) {
                console.log(err);
                next(err);
            } else {
                return res.json({
                status: true,
                message: "Updated successfully.",
                });
            }
            });
        }
        });
    },
    updateTeacher: (req, res, next) => {
        const body = req.body;
        const salt = genSaltSync(10);
        if (body.password) {
        body.password = hashSync(body.password, salt);
        }
        updateUser(body, (err, results) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            updateTeacher(body, (err, results) => {
            if (err) {
                console.log(err);
                next(err);
            } else {
                return res.json({
                status: true,
                message: "Updated successfully.",
                });
            }
            });
        }
        });
    },
    deleteUser: (req, res, next) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
        if (err) {
            console.log(err);
            next(err);
        } else if (!results) {
            return res.json({
            status: false,
            message: "Record Not Found.",
            });
        } else {
            return res.json({
            status: true,
            message: "User deleted successfully.",
            });
        }
        });
    },
    createPayment: (req, res, next) => {
        let body = req.body;
        createPayment(body, (error, results) => {
        if (error) {
            console.log(error);
            next(error);
        } else {
            console.log(results);
            return res.json({
            status: true,
            message: "Payment created successfully.",
            });
        }
        });
    },
    allPaymentUser: (req, res, next) => {
        getAllPaymentUser(req.params.sid, (err, results) => {
        if (err) {
            next(err);
        } else if (!results) {
            return res.json({
            status: false,
            message: "Data Not Found.",
            });
        } else {
            const paid = results.filter((item) => item.payment_status === 1);
            const due = results.filter((item) => item.payment_status === 0);

            return res.json({
            status: true,
            paid,
            due,
            });
        }
        });
    },
    paymentData: (req, res, next) => {
        const pid = req.params.pid;
        getUserInfoByPaymentId(pid, (err, result1) => {
        if (err) {
            next(err);
        } else if (!result1) {
            return res.json({
            status: false,
            message: "Data Not Found.",
            });
        } else {
            getPaymentDetailsByPaymentId(pid, (err2, result2) => {
            if (err2) {
                next(err2);
            } else if (!result2) {
                return res.json({
                status: false,
                message: "Data Not Found.",
                });
            } else {
                const total = result2.reduce((a, b) => a + b.amount, 0);
                return res.json({
                status: true,
                total,
                userInfo: result1,
                paymentInfo: result2,
                });
            }
            });
        }
        });
    },
    payment: (req, res, next) => {
        payFunction(res);
    },
    paymentSuccess: (req, res, next) => {
        console.log("OK");
        res.redirect("http://localhost:3000/payment");
    },
    paymentFailure: (req, res, next) => {
        res.redirect("http://localhost:3000/payment");
    },
    paymentCancel: (req, res, next) => {
        res.json(req.body);
    },
    IPNListener: (req, res, next) => {
        ipnHandler(req.body, (err, result) => {
        if (err) {
            console.log(err);
            next("Server error occurred.");
        } else if (!results) {
            return res.json({
            status: false,
            message: "Record not Found",
            });
        } else {
            results.password = undefined;
            return res.json({
            status: true,
            data: result,
            });
        }
        });
    },
};
