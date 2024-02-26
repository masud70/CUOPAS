import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DateInput = (props) => {
    const {name, id, setDate} = props;
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className="col-12 col-md-6 float-left">
            <div className="label col-3 float-left">
                <label for={id}>{name} :</label>
            </div>
            <div className="col-9 float-left">
                <DatePicker selected={startDate} onChange={(date) => {setDate(date); setStartDate(date);}} id={id}/>
            </div>
        </div>
    );
};

export default DateInput;