import React from 'react';
import { Link } from 'react-router-dom';
import './Payment.css'

const Payment = () => {
    const payments = [
        {id: 1, title: "Tuition fee of 3rd Semester", total: 1120},
        {id: 1, title: "Tuition fee of 3rd Semester", total: 1120},
        {id: 1, title: "Tuition fee of 3rd Semester", total: 1120}
    ]

    const listItems = payments.map((item)=>
        <li className="listItem">
            <div className="row d-flex align-items-center">
                <div className="col-7 col-lg-8 dueBox ">
                    <i class="fas fa-money-check pr-1"></i>
                    <span>{item.title}</span>
                </div>
                <div className="col-5 col-lg-4 dueBox text-center row p-0">
                    <div className="col-12 d-block">
                        <span>Total: {item.total}TK </span> 
                    </div>
                    <div className="col-12">
                        <Link className="btnLink" to={"/paymentdetails"}>Pay Now</Link>
                    </div>
                </div>
            </div>
        </li>
    )

    return (
        <div className="mainDivPayment">
            <div className="containerDiv row py-3 mb-2">
                <div className="headDivPayment">
                    <h2>Payment</h2>
                </div>
                <div className="row d-flex justify-content-center bg-1">
                    <div className="col-10 col-md-8 text-center pb-2">
                        <span className="headerText">Due Payments</span>
                    </div>
                    <div className="col-10 col-md-8">
                        <ul className="p-0 ">
                            {listItems}
                        </ul>
                    </div>
                    <div className="col-10 col-md-8 d-flex justify-content-center pb-2">
                        <span className="headerText">Payment History</span>
                    </div>
                    <div className="col-10 col-md-8">
                        <ul className="p-0">
                            {listItems}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;