import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomNavLink = (props) => {
    return (
        <div className="col">
            <NavLink exact to={props.to} className={({ isActive }) => "NavLink" + (isActive ? " current" : "")}>{props.name}</NavLink>
        </div>
    );
};

export default CustomNavLink;