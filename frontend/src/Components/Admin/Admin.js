import React from 'react';
import { Route, Routes } from 'react-router';
import AdminAllOptions from '../AdminAllOptions/AdminAllOptions';
import './Admin.css';

const Admin = () => {
    return (
        <div className='adminDashboard bounce-1'>
            <Routes>
                <Route path={"/"} element={<AdminAllOptions/>} />
            </Routes>
        </div>
    );
};

export default Admin;