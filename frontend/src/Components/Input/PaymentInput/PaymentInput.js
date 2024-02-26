import React, { useState } from 'react';
import './PaymentInput.css';

const PaymentInput = (props) => {
    const {value, fields, update, total} = props;

    const onClickHandler = e =>{
        e.preventDefault();
        const updated = fields.filter(item => item != value)
        update(updated)
        total(t=>t+1)
    }
    
    return (
        <div className="col-12 row paymentCreationInput animate__animated animate__backInRight mx-auto text-center d-flex align-items-center">
            <div className="label col-7 text-left">
                <label for={value.name}>{value.name}</label>
            </div>
            <div className="col-3 float-left">
                {value.value}
            </div>
            <div className="col-2 m-0 mr-0 pr-0">
                <button onClick={e=> onClickHandler(e)} className="RemoveIcon float-right" title={value.name}><i class="fas fa-times-circle"></i></button>
            </div>
        </div>
    );
};

export default PaymentInput;