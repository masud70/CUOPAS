import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Activity.css'

const Activity = (props) => {
    return (
        <div className="mainDivActivity">
            <NavLink to={props.link} className="activityLink">
                <i className={props.icon}></i>
                <span className="activityTitle">{props.title}</span>
            </NavLink>
        </div>
    );
};

export default Activity;