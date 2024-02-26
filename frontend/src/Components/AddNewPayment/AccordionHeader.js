import React, {useState} from 'react';
import './AddNewPayment.css'

const AccordionHeader = (props) => {
    const {id, list, remove} = props;

    const onClickHandler = e =>{
        e.preventDefault();
        const updated = list.filter(item => item.id != id)
        remove(updated)
    }

    return (
        <div className='row d-flex align-items-center'>
            <div className="col-8">
                {id}
            </div>
            <div className="col-4 text-right">
                <button onClick={onClickHandler} className="RemoveIcon" title={id}><i class="fas fa-times-circle"></i></button>
            </div>
        </div>
    );
};

export default AccordionHeader;