import React from 'react'
import './login.css'
import LoginForm from './LoginForm'

function Login() {
    return (
        <div className="row d-flex align-items-center justify-content-center  mainDiv animate__animated animate__backInDown">
            <div className="col-8 col-md-4 formBox">
                <i className="formLogo animate__zoomInDown animate__animated fas fa-user-graduate"></i>
                {/* <img  src="https://cu.ac.bd/assets/image/culogo.png" alt="" /> */}
                <LoginForm/>
            </div>
        </div>
    )
}

export default Login
