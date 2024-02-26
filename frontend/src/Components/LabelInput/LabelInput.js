import React from 'react';
import './LabelInput.css'

const LabelInput = (props) => {
    const {name,type, setData} = props;
    const inputHandler = (e) =>{
        setData(e.target.value)
    }
    return (
        <div className="col-12 col-md-6 float-left">
            <div className="label col-3 float-left">
                <label for={name}>{name} :</label>
            </div>
            <div className="col-9 float-left">
                <input type={type} id={name} onChange={(e)=>{inputHandler(e)}} className='labelInput'/>
            </div>
        </div>
    );
};

export default LabelInput;