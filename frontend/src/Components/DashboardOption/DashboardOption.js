import React from 'react';
import './DashboardOption.css';

const DashboardOption = (props) => {
    const [name, iconClass] = [props.name,props.iconClass];
    return (
        <div className="ADashboardOption">
            <i className={"fas "+iconClass+" OptionIcon"}></i>
            <h3 className="OptionTitle">{name}</h3>
        </div>
    );
};

export default DashboardOption;