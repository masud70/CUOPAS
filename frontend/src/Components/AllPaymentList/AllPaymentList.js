import React from 'react';
import APaymentDetailDiv from '../APaymentDetailDiv/APaymentDetailDiv';
import LabelInput from '../LabelInput/LabelInput';
import './AllPaymentList.css';

const AllPaymentList = () => {
    return (
        <div className='AllPaymentList row'>
            <form action="" className='col-12 my-3 d-flex align-items-center justify-content-center'>
                <LabelInput name="Input ID" type="number" />
            </form>
            <hr className='col-8 h-25 bg-dark' />
            <APaymentDetailDiv date="30 February, 2022"/>
            <APaymentDetailDiv date="31 February, 2022"/>
        </div>
    );
};

export default AllPaymentList;