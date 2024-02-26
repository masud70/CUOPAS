import React from 'react';
import { Link } from 'react-router-dom';
import './AdminOption.css';

const AdminOption = (props) => {
    const [name,number,iconClass,link,btnName ] = [props.name, props.number, props.iconClass,props.link,props.btnName];
    return (
        <div className="anAdminOption text-center">
            <i className={"fas "+iconClass}></i>
            <h5>{number} {name}</h5>
            <Link to={link}> <button className="addButton">{btnName}</button></Link>
        </div>
    );
};

export default AdminOption;