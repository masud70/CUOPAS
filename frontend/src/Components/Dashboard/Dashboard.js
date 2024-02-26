import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthApi from '../../ContextApi/AuthApi';
import SuperAdmin from '../../pages/SuperAdmin/SuperAdmin';
import DashboardOption from '../DashboardOption/DashboardOption';
import Notice from '../Notice/Notice';
import './Dashboard.css';

const Dashboard = () => {
    const Auth = useContext(AuthApi);
    const [role, setRole] = useState(Auth.userData.role.split(' ').join('').split(','))
    return (
        <>
            <Notice/>
            <div className="row d-flex justify-content-center px-2 bounce-1">
                {role.includes('student') && <Link to="/payment"><DashboardOption name="Payment" iconClass="fa-money-check-alt"/></Link>}
                {role.includes('student') && <Link to="/classroom"><DashboardOption name="My Class" iconClass="fa-user-check"/></Link>}
                {role.includes('teacher') && <Link to="/classroom"><DashboardOption name="My Class" iconClass="fa-user-check"/></Link>}
                {role.includes('student') && <Link to="/user"><DashboardOption name="User" iconClass="fa-cogs"/></Link>}
                {role.includes('admin') && <Link to="/payment"><DashboardOption name="Payment" iconClass="fa-user-shield"/></Link>}
                {role.includes('admin') && <Link to="/student"><DashboardOption name="Add Student" iconClass="fa-user-shield"/></Link>}
                {role.includes('admin') && <Link to="/paymentHistory"><DashboardOption name="Payment History" iconClass="fa-user-shield"/></Link>}
                {role.includes('admin') && <Link to="/updatePayment"><DashboardOption name="Update Payment" iconClass="fa-user-shield"/></Link>}
                {role.includes('admin') && <Link to="/user"><DashboardOption name="Update Profile" iconClass="fa-user-shield"/></Link>}
                {role.includes('super_admin') && <Link to="/dbaManager"><DashboardOption name="DBA Manager" iconClass="fa-user-shield"/></Link>}
            </div>
        </>
    );
};

export default Dashboard;