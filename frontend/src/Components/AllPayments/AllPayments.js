import React, { useContext, useEffect, useState} from 'react';
import AuthApi from '../../ContextApi/AuthApi';
import PaymentList from '../PaymentList/PaymentList';
import axios from 'axios';
import './AllPayments.css';
const api = axios.create({
    baseURL: "http://localhost:5000/"
});
const AllPayments = () => {
    const Auth = useContext(AuthApi);
    const [paid, setPaid] = useState([]);
    const [due, setDue] = useState([]);

    useEffect(()=>{
        const url = "/api/user/getUserPayments/"+Auth.userData.id;
        api.get(url).then(res=>{
            if(res.data.status){
                setPaid(res.data.paid);
                setDue(res.data.due);
            }
        })
    },[Auth.userData.id]);

    const paidList = paid.map(item=>{
        return <PaymentList name={item.purpose_title} id={item.payment_id} total={item.total} dueDate={ (item.payment_date instanceof Date) ? item.payment_date.toLocaleDateString() : new Date(item.payment_date).toDateString() }/>
    });
    const dueList = due.map(item=>{
        return <PaymentList name={item.purpose_title} id={item.payment_id} total={item.total} dueDate={ (item.due_date instanceof Date) ? item.due_date.toLocaleDateString() : new Date(item.due_date).toDateString() }/>
    });

    return (
        <div className="AllPaymentsDiv">
            <h5 className="PaymentTypeTitle">Due Payments</h5>
            {dueList}
            <br />
            <h5 className="PaymentTypeTitle">Payment History</h5>
            {paidList}
        </div>
    );
};

export default AllPayments;