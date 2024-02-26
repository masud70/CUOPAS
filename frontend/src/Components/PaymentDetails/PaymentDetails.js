import React, {useState, useEffect, useContext, useRef} from 'react';
import ReactToPrint from 'react-to-print';
import './PaymentDetails.css';
import QRCode from "react-qr-code";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Tag } from 'antd';
import AuthApi from '../../ContextApi/AuthApi';
import { DollarCircleOutlined, FilePdfOutlined } from '@ant-design/icons';
const api = axios.create({
    baseURL: "http://localhost:5000/",
    mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
});

const pageStyle = `
  @page {
    size: 80mm 50mm;
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
    },
    .thead-dark{
        background-color: 'black';
    }
  }
`;

const ComponentToPrint = React.forwardRef((props, ref) => {
    const {total, userInfo, url, details} = props.data;
    return (
        <div ref={ref} className="moneyReceiptContainer my-2 d-block">
            <div className="borderDiv mx-auto col-12 w-75">
                <div className="col-12 p-0 col-md-9 d-flex mb-4">
                    <div className="col-3 p-0">
                        <img className="logo" src="https://cu.ac.bd/people/assets/image/culogolightblue_lite.png" alt="" />
                    </div>
                    <div className="col-6 text-center fontTahoma">
                        <span className="universityTitle-money-recipt">University of Chittagong</span>
                        <h6>Money Receipt</h6>
                    </div>
                    <div className="col-3 p-0 text-right">
                        <QRCode level={'H'} fgColor={"#222"} bgColor={"#DDD"} size={80} value={url} />
                    </div>
                </div>
                <div className="col-12 col-md-9">
                    <div className="row tableDiv">
                        <table class="table bg-light">
                            <thead class="thead-dark text-center" style={{backgroundColor: 'rgb(10,200,120)'}}>
                                <tr>
                                    <th colSpan="3" scope="col">Student's information</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="studentData">
                                    <td>Name</td>
                                    <td>:</td>
                                    <td>{userInfo.name}</td>
                                </tr>
                                <tr className="studentData">
                                    <td>Department</td>
                                    <td>:</td>
                                    <td>{userInfo.department_name}</td>
                                </tr>
                                <tr className="studentData">
                                    <td>Student ID</td>
                                    <td>:</td>
                                    <td>{userInfo.student_id}</td>
                                </tr>
                                <tr className="studentData">
                                    <td>Session</td>
                                    <td>:</td>
                                    <td>{userInfo.session}</td>
                                </tr>
                                <tr className="studentData">
                                    <td>Due Date</td>
                                    <td>:</td>
                                    <td>{ (userInfo.due_date instanceof Date) ? userInfo.due_date.toLocaleDateString() : new Date(userInfo.due_date).toDateString() }</td>
                                </tr>
                                <tr className="studentData">
                                    <td>Payment Status</td>
                                    <td>:</td>
                                    <td>{userInfo.payment_status==1?<Tag className='px-4 py-1' color="#44bd32">Paid</Tag>:<Tag className='px-4 py-1' color="#F97F51">Unpaid</Tag>}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-12 col-md-9">
                    <div className="row tableDiv">
                        <table class="table bg-light">
                            <thead class="thead-dark text-center">
                                <tr>
                                    <th colSpan="3" scope="col">Payment Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="studentData header">
                                    <th colSpan="2">Detals</th>
                                    <th className="text-right">Amount</th>
                                </tr>
                                {details}
                                <tr className="studentData header">
                                    <th >Total</th>
                                    <td>-</td>
                                    <th className="text-right">{total}/-</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
});

const PaymentDetails = () => {
    const [userInfo, setUserInfo] = useState({});
    const [paymentData, setPaymentData] = useState([]);
    const [total, setTotal] = useState(0);
    const {pId} = useParams();
    const Auth = useContext(AuthApi);
    const componentRef = useRef();

    const payNow = () => {
        if(Auth.userData && userInfo.payment_status === 0){
            let data = {};
            data.name = Auth.userData.name;
            data.email = Auth.userData.email;
            data.phone = Auth.userData.phone;
            data.amount = parseInt(total);
            console.log(data)
            api.get('/payment').then(res=>{
                console.log(res.data)
            })
        }
    }

    useEffect(()=>{
        const url = "/api/user/payment/"+pId;
        api.get(url).then(res=>{
            console.log(res.data)
            setUserInfo(res.data.userInfo[0]);
            setPaymentData(res.data.paymentInfo);
            setTotal(res.data.total);
        })
    },[]);

    const details = paymentData.map(item=>{
        return (
            <tr className="studentData">
                <td >{item.details}</td>
                <td>-</td>
                <td className="text-right">{item.amount}/-</td>
            </tr>
        );
    });
    const url = "http://localhost:3000/payment/"+pId;
    const title = "MoneyReceipt"+pId;
    return (
        <div className="mainDivPayment row mx-0 pb-3" id="mainDivPayment">
            <div className="containerDiv row pb-2">
                <ComponentToPrint ref={componentRef} data={{url, userInfo, details, total}}/>
                <ReactToPrint
                    trigger={() => <Button className="d-flex align-items-center" type="primary" shape="round" icon={<FilePdfOutlined style={{fontSize: '18px'}}/>} size='middle'>Print Receipt</Button>}
                    content={() => componentRef.current}
                    documentTitle={title}
                    pageStyle={pageStyle}
                />
            </div>
            {
                userInfo.payment_status === 1 ? "" :
                <div className="actionDiv">
                    <img className="paymentGateway" src="http://www.uiu.ac.bd/wp-content/uploads/2020/06/SSL-Commerz-Pay-With-logo-All-Size-01.png" alt="" />
                    <a href="http://localhost:5000/api/user/payment" className="paymentBtn d-flex align-items-center"><DollarCircleOutlined style={{fontSize: '20px', fontWidth: 'bold'}} />&nbsp; Pay Now</a>
                </div>
            }
        </div>
    );
};

export default PaymentDetails;