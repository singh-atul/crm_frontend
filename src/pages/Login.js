import React, { useState } from "react";
import axios from 'axios';
import '../styles/login.css';
import { Link } from "react-router-dom";

const BASE_URL = 'http://127.0.0.1:8080';

function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const [message,setMessage] = useState("");
    const loginFn = () => {
        const userId = document.getElementById("userId");
        const password = document.getElementById("password");
        const data = {
            userId: userId.value,
            password: password.value
        };
        axios.post(BASE_URL + '/crm/api/v1/auth/signin', data)
            .then(function (response) {
                if (response.status==200) {
                    if(response.data.message){
                          setMessage(response.data.message)
                    }
                    else{
                        localStorage.setItem("name", response.data.name)
                        localStorage.setItem("userId", response.data.userId);
                        localStorage.setItem("email", response.data.email);
                        localStorage.setItem("userTypes", response.data.userTypes);
                        localStorage.setItem("userStatus", response.data.userStatus);
                        localStorage.setItem("token", response.data.accessToken);
                        if(response.data.userTypes=="CUSTOMER")
                            window.location.href = "/customer";
                        else if((response.data.userTypes=="ENGINEER"))
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
            userId:userId.value,
            email:email.value,
            userType:userType.value,
            password: password.value
        };

        axios.post(BASE_URL + '/crm/api/v1/auth/signup', data)
            .then(function (response) {
                if (response.status==201) {
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
    return (
        <div id="loginPage">
            {/*
                
                For Login Part, few minor checks that we can add
                “name” : should not be empty
                "password": should not be empty
                "message" element to display the proper error message


                --- For SignUp Part maintain the following checks: ---

                “name” : should not be empty
                “userId” : should not be empty
                “email” : email validation is performed at backend no need to do it on frontend
                “userType” : ADMIN | ENGINEER | CUSTOMER (From API it can be only engineer or customer)
                "password": No validation is on password, better we do it on frontend

                "message" element to display the proper error message

            */}
            
        </div>
    )
}

export default Login;