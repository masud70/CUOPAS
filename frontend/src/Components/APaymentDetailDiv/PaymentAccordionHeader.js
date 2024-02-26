import React from 'react';

const PaymentAccordionHeader = (props) => {
    const {id,name} = props;
    return (
        <div>
            <h5 className='mb-0 pb-0'>{name}</h5>
        </div>
    );
};

export default PaymentAccordionHeader;