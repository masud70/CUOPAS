import React from 'react';
import { Link } from 'react-router-dom';
import './FloatingNav.css'

const FloatingNavBtn = (props) => {
    return (
        <div className="col-12 FloatNavLink animate__animated animate__bounceInLeft" style={props.bgColor}>
            <Link onClick={props.control} to={props.link} className='NavLinkText row'>
                <div className="col-3 text-center" style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <i className={props.icon}></i>
                </div>
                <div className="col-8">
                    {props.name}
                </div>
            </Link>
        </div>
    );
};

export default FloatingNavBtn;