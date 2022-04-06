
import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/admin.css';
const BASE_URL = 'http://127.0.0.1:8080';

function Admin() {
    const [userId, setUserId] = useState('');
    const [userType, setUserType] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [userName, setUserName] = useState('');
    const [userList, setUserList] = useState([]);
    const [message,setMessage] = useState("");

    const fetchUsers = () => {

        const data = {
            "userType":userType,
			"userStatus": userStatus,
            "name" : userName
		};
        console.log(BASE_URL + '/crm/api/v1/users/'+userId);
        axios.get(BASE_URL + '/crm/api/v1/users/'+userId,{
            headers: {
                'x-access-token': localStorage.getItem("token")
              },
            params: data
        }).then(function (response) {
            if (response.status==200) {
                console.log(response);
                setUserList(response.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    const updateUsers = (e) =>{
        var userToUpdate = userList.filter(function (user) {
            return user["userId"]==e.target.id;
          })[0];
        
        // TODO: Need to discuss on how we will keep the interface for updating the details post that need to work on updating request body
        const data = {
            // "userType":,
			// "userStatus":,
            // "userName" : 
        }
        axios.put(BASE_URL + '/crm/api/v1/users/'+userToUpdate["userId"],{
            headers: {
                'x-access-token': localStorage.getItem("token")
              },data
        }).then(function (response) {
            if (response.status==200) {
                console.log(response);
                setMessage(response.message);
            }
        })
        .catch(function (error) {
            if(error.status==400)
                setMessage(error.message);
            else
                console.log(error);
        });



    }
    

    const filterUserId = (e) =>{
        setUserId(e.target.value);
        fetchUsers();
    } 
    const filterUserType = (e) =>{
        setUserType(e.target.value);
        fetchUsers();
    }
    const filterUserStatus = (e) =>{
        setUserStatus(e.target.value);
        fetchUsers();
    }
    const filterUserName = (e) =>{
        setUserName(e.target.value);
        fetchUsers();
    }
    const clearUserFilter = () => {
        setUserId("");
        setUserType("");
        setUserStatus("");
        setUserName("");
        fetchUsers();

    }
    
    return (
        <div>
            {/* <h3>ADMIN DASHBOARD</h3>
            <button onClick={fetchUsers} >Get Users</button>
            <button onClick={clearUserFilter} >Clear User filter</button>


                        <div >
							{
								userList.map((user) => (
									<div>
										<div>Name: {user.name}</div>
										<div>ID: {user.userId}</div>
                                        <div>EMAIL: {user.email}</div>
                                        <div>userTypes: {user.userTypes}</div>
                                        <div>userTypes: {user.userStatus}</div>
                                    </div>     
								))
							}
						</div>

            <div>
                Search by Id<input type="text" onChange={filterUserId} />
                Search by Name<input type="text" onChange={filterUserName} />
                
            </div> */}
        </div>
    )

}

export default Admin;