import React from 'react';
import './SidebarSignleDiv.css';

const SidebarSingleDiv = (props) => {
    return (
        <div className="SidebarSingleDiv d-flex align-items-center">
            {props.name}
        </div>
    );
};

export default SidebarSingleDiv;