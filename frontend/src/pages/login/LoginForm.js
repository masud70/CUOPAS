import React from 'react'

function LoginForm() {
    return (
        <div>
            <form className="d-flex align-items-center flex-column">
                <div className="inputBox animate__animated animate__fadeInLeftBig">
                    <span className="label justify-content-start">Student ID</span> <br />
                    <input className="inputField1" type="text" placeholder="Student ID" />
                </div>
                <div className="inputBox animate__animated animate__fadeInRightBig">
                    <span className="label justify-content-start">Password</span> <br />
                    <input className="inputField2" type="password" placeholder="Password" />
                </div>
                <div className="row w-100">
                    <div className="col-12 col-md-6 px-0 pb-3">
                        <input type="checkbox" name="forgotPassword" id="" />
                        <span className="formText"> Remember me</span>
                    </div>
                    <div className="col-12 col-md-6 px-0 pb-3">
                        <a className="formText" href="#">Forgot Password?</a>
                    </div>
                </div>
                <div className="loginBtn animate__animated animate__fadeInUpBig">
                    <i class="btnText fas fa-arrow-circle-right mr-1"></i>
                    <span className="btnText text">Login </span>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
