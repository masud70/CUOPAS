const router = require("express").Router();
const { checkToken } = require("../../auth/tokenValidation");
const { check, validationResult } = require('express-validator');
const {
    createStudent,
    createTeacher,
    login,
    getUserByUserId,
    deleteUser,
    getUserByUserEmail,
    getAllStudents,
    getAllTeachers,
    updateStudent,
    updateTeacher,
    createPayment,
    getData,
    allPaymentUser,
    paymentData,
    payment,
    paymentSuccess,
    paymentFailure,
    IPNListener,
    paymentCancel
} = require("./userController");

router.post("/login", login);
router.post("/data",checkToken, getData);

router.post("/addStudent",[
    check('student_id', "Invalid student ID")
            .isLength({min:8, max:10}),
        check('name', "Name is required!")
            .exists()
            .isLength({min: 5})
            .isString(),
        check('name_bangla', "Name in Bangla is required!")
            .exists()
            .isLength({min: 5})
            .isString(),
        check('email',"Invalid email")
            .exists()
            .normalizeEmail()
            .isEmail(),
        check('phone', "Invalid phone number!")
            .exists()
            .isMobilePhone()
            .isLength({min: 11, max: 15})
] , createStudent);
router.post("/addTeacher",[
    check('teacher_id', "Invalid teacher ID")
            .isLength({min:6, max:10}),
        check('name', "Name is required!")
            .exists()
            .isLength({min: 5})
            .isString(),
        check('name_bangla', "Name in Bangla is required!")
            .exists()
            .isLength({min: 5})
            .isString(),
        check('email',"Invalid email")
            .exists()
            .normalizeEmail()
            .isEmail(),
        check('phone', "Invalid phone number!")
            .exists()
            .isMobilePhone()
            .isLength({min: 11, max: 15})
] , createTeacher);
router.post('/userByEmail', getUserByUserEmail);
router.post('/createPayment', createPayment);
router.get('/getUserPayments/:sid', allPaymentUser);
router.get('/payment', payment);
router.get('/payment/success', paymentSuccess);
router.get('/payment/failure', paymentFailure);
router.get('/payment/cancel', paymentCancel);
router.get('/payment/ipn', IPNListener);
router.get('/payment/:pid', paymentData);
router.get('/allStudents', getAllStudents);
router.get('/allTeachers', getAllTeachers);
router.patch('/updateStudent', updateStudent);
router.patch('/updateTeacher', updateTeacher);
router.delete("/", deleteUser);
router.get('/:id',(req,res,next)=>{
    console.log(req.params.id)
    next()
} , getUserByUserId);

module.exports = router;