import React, { useState, useEffect, useContext} from 'react';
import AuthApi from '../../ContextApi/AuthApi';
import SidebarSingleDiv from '../SidebarSingleDiv/SidebarSingleDiv';
import axios from "axios";
import Cookies from 'js-cookie';
import './Sidebar.css';

const api = axios.create({
    baseURL: "http://localhost:5000/",
  });

const SideBar = (props) => {
    const Auth = useContext(AuthApi);
    const [userData, setUserData] = useState(Auth.userData);
    const [role, setRole] = useState(userData.role.split(','))
    const info = Object.keys(userData).map((key)=>{
        return (<SidebarSingleDiv name={userData[key]}/>) 
    });

    return (
        <div className="sideBar text-center">
            <h3 className="roleTitle">{role.includes('student') ? "Student" : role.includes('teacher') ? "Teacher":"Admin"}</h3>
            <hr className="bg-light mb-3" />
            <div className="profilePic mx-auto mb-2">
                <img src={userData.image} alt="" />
            </div>
            <h4 style={{color:"white"}}>{userData.name}</h4>
            <SidebarSingleDiv name={userData.name_bangla}/>
            <SidebarSingleDiv name={userData.id}/>
            <SidebarSingleDiv name={userData.department_name}/>
            <SidebarSingleDiv name={userData.email}/>
            <SidebarSingleDiv name={userData.phone}/>
            <input onClick={Auth.getLogout} className="logoutBtn" type="button" value="Logout" name="logout"/>
        </div>
    );
};

export default SideBar;