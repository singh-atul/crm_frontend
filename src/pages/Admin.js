
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
        <div className="container my-2">
        <h3>ADMIN DASHBOARD</h3>

        {/* cards section */}
        <div className="row">

            <div className="col">
                <div className="card shadow" style={{ width: 15 + 'rem' }}>
                    <div className="card-body">
                        <h5 className="card-subtitle mb-2 text-primary">Card 1</h5>
                        <hr />
                        <div className="col">Some value</div>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card shadow" style={{ width: 15 + 'rem' }}>
                    <div className="card-body">
                        <h5 className="card-subtitle mb-2 text-primary">Card 1</h5>
                        <hr />
                        <div className="col">Some value</div>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card shadow" style={{ width: 15 + 'rem' }}>
                    <div className="card-body">
                        <h5 className="card-subtitle mb-2 text-primary">Card 1</h5>
                        <hr />
                        <div className="col">Some value</div>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card shadow" style={{ width: 15 + 'rem' }}>
                    <div className="card-body">
                        <h5 className="card-subtitle mb-2 text-primary">Card 1</h5>
                        <hr />
                        <div className="col">Some value</div>
                    </div>
                </div>
            </div>

        </div>


        <div className="row my-4">


            {/*     table map values here, search here */}
            
            <div className="col">
                <div className="card shadow" style={{ width: 50.7 + 'rem' }}>
                    <div className="card-body">
                        <h5 className="card-subtitle mb-2 text-primary">Get Users</h5>

                        <div >
                            <div className="input-group my-1">
                                <input type="text" className="form-control" placeholder="Search..." id="search" /><i className="bi bi-search btn btn-outline-secondary text-primary"></i>
                            </div>
                            <table className="table table-borderless">

                                <thead className="bg-light">
                                    <tr>
                                        <th scope="col">User Id</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Utk</td>
                                        <td>Utkmail</td>
                                        <td>ENGINEER</td>
                                        <td>Approved</td>




                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Atul</td>
                                        <td>atulmail</td>
                                        <td>ENGINEER</td>
                                        <td>Approved</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>more dt=a</td>
                                        <td>atulmail</td>
                                        <td>ENGINEER</td>
                                        <td>Approved</td>
                                    </tr>

                                    

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>



            {/* Form update user details here  */}

            <div className="col">
                <div className="card m shadow" style={{ width: 15 + 'rem' }}>
                    <div className="card-body">
                        <h5 className="card-subtitle mb-2 text-primary">Edit User</h5>
                        <hr />
                        <div className="col">
                            <div>
                                <div className="input-group m-1">
                                    <input type="text" className="form-control" placeholder="Username" id="username" />
                                </div>
                                <div className="input-group m-1">
                                    <input type="text" className="form-control" placeholder="Email" id="email" />
                                </div>
                                <div className="input-group m-1">
                                    <input type="password" className="form-control" placeholder="Password" id="password" />
                                </div>
                                <div className="input-group m-1">
                                    <span className="text-muted my-2 mx-2"> User Type</span>
                                    {/* add dropdown menu */}
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <button className="btn btn-outline-secondary">Cancel</button>
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


        {/* <button onClick={fetchUsers} >Get Users</button>
        <button onClick={clearUserFilter} >Clear User filter</button> */}


        {/* <div >
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
                    </div> */}

        {/* <div>
            Search by Id<input type="text" onChange={filterUserId} />
            Search by Name<input type="text" onChange={filterUserName} />
            
        </div> */}
    </div>
        // <div>

        //     {/* <h3>ADMIN DASHBOARD</h3>
        //     <button onClick={fetchUsers} >Get Users</button>
        //     <button onClick={clearUserFilter} >Clear User filter</button>


        //                 <div >
		// 					{
		// 						userList.map((user) => (
		// 							<div>
		// 								<div>Name: {user.name}</div>
		// 								<div>ID: {user.userId}</div>
        //                                 <div>EMAIL: {user.email}</div>
        //                                 <div>userTypes: {user.userTypes}</div>
        //                                 <div>userTypes: {user.userStatus}</div>
        //                             </div>     
		// 						))
		// 					}
		// 				</div>

        //     <div>
        //         Search by Id<input type="text" onChange={filterUserId} />
        //         Search by Name<input type="text" onChange={filterUserName} />
                
        //     </div> */}
        // </div>
    )

}

export default Admin;