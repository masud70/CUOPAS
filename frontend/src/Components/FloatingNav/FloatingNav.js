import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './FloatingNav.css'
import FloatingNavBtn from './FloatingNavBtn';

const FloatingNav = () => {
    const [open, setOpen] = useState(true)
    const [show, setShow] = useState({height: '0px'})
    const onClickHandler = () =>{
        setOpen(!open)
        if(!open){
            setShow({height: '0px'})
        }else{
            setShow({height: '400px'})
        }
    }
    return (
        <div className='FloatingMainDiv' style={show}>
            <div className="row navLink" hidden={open}>
                <FloatingNavBtn control={onClickHandler} link="/" name="Home &nbsp;&nbsp;" icon="fas fa-home" bgColor={{backgroundColor: '#041C32'}}/>
                <FloatingNavBtn control={onClickHandler} link="/payment" name="Payment" icon="fas fa-credit-card" bgColor={{backgroundColor: '#AE431E'}}/>
                <FloatingNavBtn control={onClickHandler} link="/attendance" name="Attendance" icon="fas fa-list" bgColor={{backgroundColor: '#160040'}}/>
                <FloatingNavBtn control={onClickHandler} link="/admin" name="Admin&nbsp;&nbsp;&nbsp;" icon="fas fa-user" bgColor={{backgroundColor: '#0B4619'}}/>
                <div className="col-12"></div>
            </div>
            <div className="NavContainer" onClick={onClickHandler}>
            </div>
        </div>
    );
};

export default FloatingNav;