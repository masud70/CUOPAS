import React, { useState } from 'react';
import './APaymentDetailDiv.css';
import Accordion from 'react-tiny-accordion';
import PaymentAccordionHeader from './PaymentAccordionHeader';
import SideBar from '../SideBar/SideBar';
import PaymentDetailDivProfileInfo from '../PaymentDetailDivProfileInfo/PaymentDetailDivProfileInfo';
import PaymentInput from '../Input/PaymentInput/PaymentInput';

const APaymentDetailDiv = (props) => {
    const {date} = props;
    const information = {
        name: 'Tonmoy Chandro Das',
        role: 'student',
        isAdmin:true,
        image: 'https://i.postimg.cc/XYnQrY80/image.png',
        id: '19701066',
        department: 'Computer Science and Engineering',
        faculty: 'Faculty of Engineering',
        session: '2018-2019',
        hall: 'Shahid Abdur Rab Hall',
        year: '4th Semester'
    }

    const [field, setField] = useState([
        {name: 'Tuiotion Fee', value: 3000},
        {name: 'Admision Fee', value: 2500},
    ])

    const [fieldName, setFieldName] = useState("")
    const [fieldValue, setFieldValue] = useState(0)
    const [total, setTotal] = useState(0)
    
    const submitNow = (e) =>{
        e.preventDefault()
        console.log(field)
    }
    const onClickHandler = (e) =>{
        e.preventDefault();
        const values = [...field , {name: fieldName, value: fieldValue}];
        setField(values)
        setFieldName("")
        setFieldValue("")
        const Total = values.reduce((a, b) => parseInt(b.value)+a, 0)
        setTotal(Total)
    }

    return (
        <div className="APaymentDetailDiv col-12">
            <h5 className='PaymentsDateTitle'>{date}</h5>
            <Accordion className='accordion mb-1 animate__animated animate__backInLeft'>
                <div data-header={ <PaymentAccordionHeader name={"4th Semester Fee, 2021"}/>} >
                    <div className="row">
                        <div className="col-4 float-left">
                            <PaymentDetailDivProfileInfo info={information}/>
                        </div>
                        <div className="col-8 float-left">
                            <form action="" className='text-center'>
                                {
                                    field.map((val) =>
                                        <PaymentInput value={val} fields={field} update={setField} total={setTotal}/>
                                    )
                                }
                                <Accordion className='accordion mb-1'>
                                    <div data-header="Add a new field">
                                        <div className="row m-2 d-flex align-items-center">
                                            <div className="col-6">
                                                <input value={fieldName} onChange={e=>setFieldName(e.target.value)} type="text" placeholder='Field name'/>
                                            </div>
                                            <div className="col-3">
                                                <input value={fieldValue} onChange={e=>setFieldValue(parseInt(e.target.value))} type="number" placeholder='Amount'/>
                                            </div>
                                            <div className="col-3 text-center">
                                                <input onClick={(e)=>{onClickHandler(e)}} type="button" className='text-center pt-2' value="Add"/>
                                            </div>
                                        </div>
                                    </div>
                                </Accordion>
                                <hr className="bg-dark" />
                                <div className="col-12 py-0 row mx-auto text-center">
                                    <div className="col-5 h3 text-left float-left">
                                        Total:
                                    </div>
                                    <div className="col-7 h3 font-weight-bold float-left text-right">
                                        1300
                                    </div>
                                </div>
                                <button onClick={e=>submitNow(e)} type="submit" className="PaymentEditSubmitButton mt-4">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Accordion>
        </div>
    );
};

export default APaymentDetailDiv;