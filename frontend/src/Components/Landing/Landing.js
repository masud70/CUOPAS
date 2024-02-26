import React, { useState, useEffect, useContext} from 'react';
import './Landing.css';
import $ from "jquery";
import logo from "../../Images/logo.png";
import AuthApi from '../../ContextApi/AuthApi';
import { useNavigate } from "react-router";




const Landing = (props) => {
    const Navigate = useNavigate();
    const [goForSignIn,setGoForSignIn] = useState(false);
    const [id, setId] = useState(null);
    const [password, setPassword] = useState(null);
    const Auth = useContext(AuthApi)

    const signInbuttonClick = (e)=>{
        setGoForSignIn(true);
        $(".log-in-input-section").css('border','2px solid rgba(255, 255, 255, 0.705)');
    }
    useEffect(() => {
        Navigate('/')
    }, [])
    
    return (
        <div id="landing-body" className="d-flex justify-content-center flex-column align-items-center">
                <div className="title-part">
                    <img src={logo} alt="" srcset="" />
                    <h1>University of Chittagong</h1>
                </div>
                <div className="log-in-input-section mt-2 text-center">
                    {
                        goForSignIn &&
                        <div id="log-in-section-invisible-part" className="mb-2">
                            <div>
                                <label for="id"><i class="fas fa-user text-light"></i></label>
                                <input type="number" name="id" onChange={(e)=>{setId(e.target.value)}} placeholder="Enter ID" />
                            </div>
                            <div>
                                <label for="id"><i class="fas fa-unlock-alt text-light"></i></label>
                                <input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password"/>
                            </div>
                        </div>
                    }
                    <button className="log-in-btn" onClick={()=>{Auth.getLogin(id,password)}} hidden={!goForSignIn}>Sign In</button>
                </div>
                <button className="log-in-btn" onClick={signInbuttonClick} hidden={goForSignIn}>Sign In</button>

                <div className="footer">
                    <span style={{fontSize: "17px"}}>&copy;</span> Group - 5
                </div>
        </div>
    );
};

export default Landing;