import React, { useState } from "react";
import axios from 'axios';
import '../styles/login.css';
import { Link } from "react-router-dom";
import Dropdown from "../component/Dropdown";

const BASE_URL = 'http://127.0.0.1:8080';

function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const [message, setMessage] = useState("");
    const loginFn = () => {
        const userId = document.getElementById("userId");
        const password = document.getElementById("password");
        const data = {
            userId: userId.value,
            password: password.value
        };
        axios.post(BASE_URL + '/crm/api/v1/auth/signin', data)
            .then(function (response) {
                if (response.status == 200) {
                    if (response.data.message) {
                        setMessage(response.data.message)
                    }
                    else {
                        localStorage.setItem("name", response.data.name)
                        localStorage.setItem("userId", response.data.userId);
                        localStorage.setItem("email", response.data.email);
                        localStorage.setItem("userTypes", response.data.userTypes);
                        localStorage.setItem("userStatus", response.data.userStatus);
                        localStorage.setItem("token", response.data.accessToken);
                        if (response.data.userTypes == "CUSTOMER")
                            window.location.href = "/customer";
                        else if ((response.data.userTypes == "ENGINEER"))
                            window.location.href = "/engineer";
                        else
                            window.location.href = "/admin";
                    }
                }
            })
            .catch(function (error) {
                console.log(error);

            });
    }

    const signupFn = () => {
        const username = document.getElementById("username");
        const userId = document.getElementById("userId");
        const email = document.getElementById("email");
        const userType = document.getElementById("userType");
        const password = document.getElementById("password");



        const data = {
            name: username.value,
            userId: userId.value,
            email: email.value,
            userType: userType.value,
            password: password.value
        };

        axios.post(BASE_URL + '/crm/api/v1/auth/signup', data)
            .then(function (response) {
                if (response.status == 201) {
                    window.location.href = "/";
                }
            })
            .catch(function (error) {
                console.log(error);
                setMessage(error.data.message)
            });
    }

    const toggleSignup = () => {
        setShowSignup(!showSignup);
    }

    const options = [
        { label: 'CUSTOMER', value: 'CUSTOMER' },
        { label: 'ENGINEER', value: 'ENGINEER' },
        { label: 'ADMIN', value: 'ADMIN' },
    ];
    const handleChange = (e) => {
        console.log(e.target.value);
        return setValue(e.target.value)

    }
    const [value, setValue] = useState("CUSTOMER")
    return (
        <div id="loginPage">
            <div id="loginPage" className="bg-primary d-flex justify-content-center align-items-center vh-100">

                <div className="card m-5 p-5" >
                    <div className="row m-2">
                        <div className="col">

                            {
                                !showSignup ? (
                                    <div >
                                        <h4 className="text-center">Login</h4>
                                        <div className="input-group m-1">
                                            <input type="text" className="form-control" placeholder="User Id" id="userId" required />
                                        </div>
                                        <div className="input-group m-1">
                                            <input type="password" className="form-control" placeholder="Password" id="password" required />
                                        </div>

                                        <div className="input-group m-1">
                                            <input type="submit" className="form-control btn btn-primary" value="Log in" onClick={loginFn} />
                                        </div>
                                        <div className="signup-btn text-right text-info" onClick={toggleSignup}>Dont have an Account ? Signup</div>
                                        <div className="auth-error-msg text-danger text-center">{message}</div>
                                    </div>
                                ) : (
                                    <div>
                                        <h4 className="text-center">Signup</h4>
                                        <div className=" m-1">
                                            <input type="text" className="form-control" placeholder="Username" id="username" required />
                                        </div>
                                        <div className=" m-1">
                                            <input type="text" className="form-control" placeholder="Email" id="email" required />
                                        </div>
                                        <div className=" m-1">
                                            <input type="password" className="form-control" placeholder="Password" id="password" required />
                                        </div>


                                        <div className="input-group m-1">
                                            <Dropdown
                                                label="User Type"
                                                options={options}
                                                value={value}
                                                onChange={handleChange}
                                            />
                                        </div>


                                        <div className="input-group m-1">
                                            <input type="submit" className="form-control btn btn-primary m-1" value="Sign up" onClick={signupFn} />
                                        </div>
                                        <div className="signup-btn text-center text-info" onClick={toggleSignup}>Already have an Account ? Login</div>
                                        <div className="auth-error-msg text-danger text-center">{message}</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login;