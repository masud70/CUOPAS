import React from 'react';
import "./Header.css";
import logo from "../../logo.png";
const Header = () => {
    return (
        <div className="Menu-bar">
            <div className="row  menu-v-middle">
                <div className="col-1 float-left menu-v-middle">
                    <img src={logo} className="logo" alt="" />
                </div>
                <div className="col-3 row d-flex align-items-center menu-v-middle text-left">
                    <h4 className="p-0 col-12 m-0">University of Chittagong</h4>
                    <small className="col-12 m-0 p-0">Since 1966</small>
                </div>
                <div className="col-7 d-flex align-items-center justify-content-end ml-auto mr-4">
                    <div className="btn float-right logInButton">Log In</div>
                </div>
            </div>
            <hr className="bg-light menu-border-bottom" />

        </div>
    );
};

export default Header;