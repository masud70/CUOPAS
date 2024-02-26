import React from 'react';
import SidebarSingleDiv from '../SidebarSingleDiv/SidebarSingleDiv';

const PaymentDetailDivProfileInfo = (props) => {
    const {name,image} = props.info;
    const {id, session, year, department,hall} = props.info;
    const info={id, session, year, department,hall};

    return (
        <div className="sideBar text-center">
            <div className="profilePic mx-auto">
                <img src={image} height="100%" alt="" />
            </div>
            <h4 style={{color:"#192a56"}}>{name}</h4>
            {
                Object.keys(info).map((key) => <SidebarSingleDiv name={info[key]}/>)
            }
        </div>
    );
};

export default PaymentDetailDivProfileInfo;