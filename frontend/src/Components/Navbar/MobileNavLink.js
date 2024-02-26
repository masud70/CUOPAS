import React from 'react';
import { NavLink } from 'react-router-dom';

const MobileNavLink = (props) => {
    return (
        <div className="mobileLinkContainer">
            <div className="mobileLinkItem">
                <NavLink exact to={props.to} onClick={props.show} className={({ isActive }) => "MobileNavLink" + (isActive ? " current" : "")}>{props.name}</NavLink>
            </div>
        </div>
    );
};

export default MobileNavLink;