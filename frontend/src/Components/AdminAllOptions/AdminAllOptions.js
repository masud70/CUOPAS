import React from 'react';
import AdminOption from '../AdminOption/AdminOption';

const AdminAllOptions = () => {
    return (
        <>
            <AdminOption name="Students" link="addStudent" btnName={"Add New"}  number={20000} iconClass="fa-user-graduate"/>
            <AdminOption name="Teacher" link="addTeacher" btnName={"Add New"}  number={5000} iconClass="fa-user-tie"/>
            <AdminOption name="Payments" link="addPayment" btnName={"Add New"}  number={null} iconClass="fa-money-check-alt"/>
            <AdminOption name="Check/Update Payment" link="checkPayment" btnName={"Go Now"} number={null} iconClass="fa-money-bill-alt"/>
            <AdminOption name="Payment History" link="paymentHistory" btnName={"See Now"} number={null} iconClass="fa-money-bill-alt"/>
            <AdminOption name="Profile" link="checkProfile" btnName={"Check/Update"} number={null} iconClass="fa-id-card"/>
            <AdminOption name="Course" link="addCourse" btnName={"Add Course"} number={null} iconClass="fa-book-open"/>
            <AdminOption name="Course Teacher" link="assignCourse" btnName={"Assign Course"} number={null} iconClass="fa-book-reader"/>
        </>
    );
};

export default AdminAllOptions;