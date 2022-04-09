
import React, {useEffect, useState } from "react";
import CssBaseline from '@material-ui/core/CssBaseline'
import {SelectFilter,Records} from '../components/Tables/Table'

import axios from 'axios';
import '../styles/admin.css';
const BASE_URL = 'http://127.0.0.1:8080';


  
function Admin() {
    const [userType, setUserType] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [userName, setUserName] = useState('');
    const [userList, setUserList] = useState([]);
    const [userDetail, setUserDetail] = useState([]);
    
    const [message,setMessage] = useState("");
    useEffect(() => {
        (async () => {
            fetchUsers("");
        })();
      }, []);

    const fetchUsers = (userId) => {
        axios.get(BASE_URL + '/crm/api/v1/users/'+userId,{
            headers: {
                'x-access-token': localStorage.getItem("token")
              }
        }).then(function (response) {
            if (response.status==200) {
                if(userId)  
                    setUserDetail(response.data[0])
                else
                    setUserList(response.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
 
    const getUserDetail = (userId)=>{
        fetchUsers(userId);

        
    }

    const updateUserDetail=(e)=>{
        e.preventDefault()
        //Need to complete, 
        //currently the status of form elements are not changing when the value is set by default

        // const data = {
        //     "userType":userDetail.userType,
		// 	"userStatus":userDetail.userType,
        //     "userName" : userDetail.name
        // }
        // axios.put(BASE_URL + '/crm/api/v1/users/'+userDetail.userId,{
        //     headers: {
        //         'x-access-token': localStorage.getItem("token")
        //       },data
        // }).then(function (response) {
        //     if (response.status==200) {
        //         console.log(response);
        //         setMessage(response.message);
        //     }
        // })
        // .catch(function (error) {
        //     if(error.status==400)
        //         setMessage(error.message);
        //     else
        //         console.log(error);
        // });
    }



    const userColumns = React.useMemo(
        () => [
          {
            Header: 'USER ID',
            accessor: 'userId',
            Cell: ({ cell: { value } }) => {
            return(
                
                <button value={value} onClick={() => getUserDetail(value)}>{value}</button>
            )
            }
          },
          {
            Header: 'USER NAME',
            accessor: 'name',
          },
          {
            Header: 'EMAIL',
            accessor: 'email',
          },
          {
            Header: 'ROLE',
            accessor: 'userTypes',
            Filter: SelectFilter,
            filter: "includes"
          },
          {
            Header: 'STATUS',
            accessor: 'userStatus',
            Filter: SelectFilter,
            filter: "includes"
          }
        ],
        []
      )
    

    return (
        <div className="container my-2">
            <h3 class="text-primary">ADMIN DASHBOARD</h3>

            <div className="row my-4">


                {/*     table map values here, search here */}

                <div className="col">

                    <div className="card shadow" >
                        
                        <div><h4 className="card-subtitle center m-2 text-primary">USER RECORDS</h4></div>
                        <CssBaseline />
                        <Records columns={userColumns} data={userList} />
                    </div>
                </div>



                {/* Form update user details here  */}                   
                        

                <div className="col">
                    <form onSubmit={updateUserDetail}>
                    <div className="card shadow" style={{ width: 15 + 'rem' }}>
                        <div className="card-body">
                            <h5 className="card-subtitle mb-2 text-primary">User ID: {userDetail.userId}</h5>
                            <hr />
                            Name: <input type="text" name="name"value={userDetail.name}></input>
                            Email: {userDetail.email}
                            Type: <input type="text" name="type" value={userDetail.userTypes}></input>
                            Status: <input type="text" name="status" value={userDetail.userStatus} ></input>
                            
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                    </form>
                </div>

            </div>



        </div>
    )

}

export default Admin;

        {/* cards section */}
        {/* <div className="row">

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

        </div> */}



                {/* <div className="card shadow" style={{ width: 50.7 + 'rem' }}>
                    <div className="card-body">
                        <h5 className="card-subtitle mb-2 text-primary">Get Users</h5>
                        <div >
                            <div className="input-group my-1">
                                <input type="text" className="form-control" placeholder="Filter by User Id"   />
                                <input type="text" placeholder="Filter by User Name" className="form-control" onChange={filterUserName} />
                            </div>
                            <table className="table table-borderless">
                                <thead className="bg-light">
                                    <tr>
                                        <th >User Id</th>
                                        <th >Name</th>
                                        <th >Email</th>
                                        <th >Type <DropdownButton
                                                align="end"
                                                title={userType}
                                                id="userType"
                                                onSelect={filterUserType}
                                               variant="light"
                                               className="mx-1"
                                            >
                                                <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                                <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                                                <Dropdown.Item eventKey="ADMIN">ADMIN</Dropdown.Item>

                                            </DropdownButton></th>
                                        <th >Status


                                        <DropdownButton
                                                align="end"
                                                title={userType}
                                                id="userType"
                                                onSelect={filterUserStatus}
                                               variant="light"
                                               className="mx-1"
                                            >
                                                <Dropdown.Item eventKey="CUSTOMER">PENDING</Dropdown.Item>
                                                <Dropdown.Item eventKey="ENGINEER">APPROVED</Dropdown.Item>
                                                <Dropdown.Item eventKey="ADMIN">REJECT</Dropdown.Item>

                                            </DropdownButton>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        
                                    userList.map((user, idx) => (
                                        <tr>
                                            
                                            <td scope="col">{user.userId}</td>
                                            <td scope="col">{user.name}</td>
                                            <td scope="col">{user.email}</td>
                                            <td scope="col">{user.userTypes}</td>
                                            <td scope="col">{user.userStatus}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                     
                            </table>
                        </div>
                    </div>
                </div> */}

        
