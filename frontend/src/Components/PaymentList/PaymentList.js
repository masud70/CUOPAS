import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentList.css';

const PaymentList = (props) => {
    const [name, id,total, dueDate] = [props.name, props.id,props.total, props.dueDate];
    return (
        <div className="PaymentListDiv row d-flex align-items-center">
            <div className="col-5 float-left">
                <h5 className='mb-0'>{name}</h5>
            </div>
            <div className="col-7 d-flex align-items-center float-left">
                <div className="col-6 float-left d-flex flex-column">
                    <small className="my-0 py-0">Total: {total}</small>
                    <small className="my-0 py-0">Due Date: {dueDate}</small>
                </div>
                <div className="col-6 float-left text-right">
                    <Link to={id.toString()} className="LinkToPaymentDetails">
                        <button className="PaymentDetailsButton">Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentList;