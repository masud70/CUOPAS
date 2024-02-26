import React, {useContext, useState, useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import "./Home.css";
import SideBar from "../Components/SideBar/SideBar";
import HomeFooter from "../Components/HomeFooter/HomeFooter";
import AuthApi from "../ContextApi/AuthApi";
import Dashboard from '../Components/Dashboard/Dashboard'
import AllPayments from '../Components/AllPayments/AllPayments'
import PaymentDetails from '../Components/PaymentDetails/PaymentDetails'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import Admin from '../Components/Admin/Admin';
import AddNewTeacher from '../Components/AddNewTeacher/AddNewTeacher';
import AddNewPayment from '../Components/AddNewPayment/AddNewPayment';
import $ from 'jquery';
// import AllPaymentList from '../Components/AllPaymentList/AllPaymentList';
import PaymentList from '../Components/AllPaymentList/PaymentList';
import Navbar from '../Components/Navbar/Navbar';
import Profile from '../Components/Profile/Profile';
import AddNewStudent1 from '../Components/AddNewStudent/AddNewStudent1';
import CheckProfile from '../Components/CheckProfile/CheckProfile';
import StudentAttendance from '../pages/StudentAttendance/StudentAttendance';
import SingleClass from '../pages/SingleClass/SingleClass';
import TeacherClasses from '../pages/TeacherClasses/TeacherClasses';
import TeacherClassSingle from '../pages/TeacherClassSingle/TeacherClassSingle';
import AddCourse from '../Components/AddCourse/AddCourse';
import AssignCourse from '../Components/AssignCourse/AssignCourse';
import SuperAdmin from '../pages/SuperAdmin/SuperAdmin';
import DepartmentSingle from '../pages/SuperAdmin/DepartmentSingle/DepartmentSingle';

const Home = () => {
    const Auth = useContext(AuthApi);
    const [role, setRole] = useState([])
    useEffect(() => {
        if(Auth.userData){
            setRole(Auth.userData.role.split(' ').join('').split(','));
        }
    }, [])
    
    $(document).ready(function(){
        $(window).scroll(function(){
            if(this.scrollY > 20){
                $('.NavbarMainDiv').addClass('NavbarMainDivOnScroll');
            }else{
                $('.NavbarMainDiv').removeClass('NavbarMainDivOnScroll');
            }
        });
    });

    return (
        <div className="home row mt-5 pt-4 w-100 px-0 mx-0">
            <Navbar/>
            <div className="col-md-3 col-12 pr-0"><SideBar /></div>
            <div className="col-md-9 col-12 mx-auto rightSide px-3 w-100">
                <Routes>
                    <Route exact path="/" element={<Dashboard />}/>{console.log(role)}
                    {role.includes('student') &&  <Route exact={true} path="/payment" element={<AllPayments />}/>}
                    {role.includes('student') && <Route path="/payment/:pId" element={<PaymentDetails />}/>}
                    {role.includes('student') && <Route exact={true} path="/classroom" element={<StudentAttendance />}/>}
                    {role.includes('student') && <Route path="/classroom/:cid" element={<SingleClass />}/>}
                    {role.includes('teacher') && <Route exact={true} path="/classroom" element={<TeacherClasses />}/>}
                    {role.includes('teacher') && <Route path="/classroom/:cid" element={<TeacherClassSingle />}/>}
                    {role.includes('admin') && <Route exact={true} path={"/admin"} element={<Admin/>} />}
                    {role.includes('admin') && <Route exact={true} path={"/payment"} element={<AddNewPayment/>} />}
                    {role.includes('admin') && <Route path={"/admin/addStudent"} element={<AddNewStudent1 />} />}
                    {role.includes('admin') && <Route path={"/admin/addTeacher"} element={<AddNewTeacher/>} />}
                    {role.includes('admin') && <Route path={"/admin/addPayment"} element={<AddNewPayment/>} />}
                    {role.includes('admin') && <Route path={"/admin/checkPayment"} element={<PaymentList/>} />}
                    {role.includes('admin') && <Route path={"admin/checkProfile"} element={<CheckProfile/>} />}
                    {role.includes('admin') && <Route path={"admin/addCourse"} element={<AddCourse/>} />}
                    {role.includes('admin') && <Route path={"admin/assignCourse"} element={<AssignCourse/>} />}
                    {role.includes('super_admin') && <Route path={"dbaManager"} element={<SuperAdmin />} />}
                    {role.includes('super_admin') && <Route path={"dbaManager/department"} element={<DepartmentSingle />} />}
                    <Route path="/user" element={<Profile isDisabled={true} profileId=''/>}/>
                    <Route path="*" element={<PageNotFound />}/>
                </Routes>
            </div>
            <HomeFooter />
            <div className="col-12 creditFooter text-center">&copy; Group - 5</div>
        </div>
    );
};

export default Home;
