import React, {useState, useContext} from 'react';
import './Navbar.css';
import logo from "../../Images/logo.png";
import AuthApi from '../../ContextApi/AuthApi';
import CustomNavLink from './CustomNavLink';
import MobileNavLink from './MobileNavLink';


const Navbar = () => {
    const Auth = useContext(AuthApi)
    const [show, setShow] = useState(false);

    const toggle = () =>{
        setShow(!show);
    }

    return (
        <div className='NavbarMainDiv fixed-top'>
            <div className="NavContainer">
                <div className="section section-left row">
                    <div className="NavBrand col-3 col-md-2">
                        <img src={logo} alt="CU Logo" className='NavBrandLogo'/>
                    </div>
                    <div className="NavText col-9 col-md-10">
                        University of Chittagong
                    </div>
                </div>
                <div className="section section-middle row">
                    <CustomNavLink to="/" name="Home"/>
                    <CustomNavLink to="/payment" name="Payment"/>
                    <CustomNavLink to="/classroom" name="Attendance"/>
                    <CustomNavLink to="/user" name="User"/>
                    <CustomNavLink to="/admin" name="Admin"/>
                </div>
                <div className="section section-right row">
                    <img title="Md. Masud Mazumder" src={Auth.userData.image} alt='User' className='userLogo'/>
                    <i className="logOutBtn fas fa-sign-out-alt" onClick={Auth.getLogout} title="Logout"></i>
                </div>
                <div className="section section-most-right row" onClick={toggle}>
                    <i className='MenuBarIcon fas fa-bars'></i>
                </div>
            </div>
            <div className="mobileMenuContainer animate__fadeInUp animate__animated" hidden={!show}>
                <MobileNavLink show={toggle} to="/" name="Home"/>
                <MobileNavLink show={toggle} to="/payment" name="Payment"/>
                <MobileNavLink show={toggle} to="/attendance" name="Attendance"/>
                <MobileNavLink show={toggle} to="/admin" name="Admin"/>
            </div>
        </div>
    );
};

export default Navbar;