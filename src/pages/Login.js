import React, { useState } from "react";
import axios from 'axios';
import '../styles/login.css';
import { Dropdown, DropdownButton, InputGroup } from "react-bootstrap";

const BASE_URL = 'http://127.0.0.1:8080';


function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const [message, setMessage] = useState("");
    const [userType, setValue] = useState("CUSTOMER")

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
                if(error.response.status==400 || error.response.status==401)
                    setMessage(error.response.data.message);
                else
                    console.log(error);
            });
    }

    const signupFn = () => {
        const username = document.getElementById("username");
        const userId = document.getElementById("userId");
        const email = document.getElementById("email");
        const password = document.getElementById("password");



        const data = {
            name: username.value,
            userId: userId.value,
            email: email.value,
            userType: userType,
            password: password.value
        };
        console.log(data);

        axios.post(BASE_URL + '/crm/api/v1/auth/signup', data)
            .then(function (response) {
                if (response.status == 201) {
                    window.location.href = "/";
                }
            })
            .catch(function (error) {
                if(error.response.status==400)
                    setMessage(error.response.data.message);
                else
                    console.log(error);
            });
    }

    

    const toggleSignup = () => {
        console.log(process.env.BASE_UUU);
        setShowSignup(!showSignup);

        
    }

    const handleSelect = (e) => {
        setValue(e)

    }
    
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
                                        <div>
                                            <input type="text" className="form-control m-1" placeholder="User Id" id="userId"  required />
                                        </div>
                                        
                                        <div>
                                            <input type="text" className="form-control m-1" placeholder="Username" id="username"  required />
                                        </div>
                                            <input type="text" className="form-control m-1" placeholder="Email" id="email" required />
                                        <div>
                                            <input type="password" className="form-control m-1" placeholder="Password" id="password"  required />
                                        </div>


                                        <div className="input-group m-1">
                                        <span className="text-muted my-2 mx-2"> User Type</span>
                                            <DropdownButton
                                                align="end"
                                                title={userType}
                                                id="userType"
                                                onSelect={handleSelect}
                                               variant="light"
                                               className="mx-1"
                                            >
                                                <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                                <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                                                <Dropdown.Item eventKey="ADMIN">ADMIN</Dropdown.Item>

                                            </DropdownButton>
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