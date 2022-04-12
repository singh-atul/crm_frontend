//TO DO
// Add a functionality to show message such as if connection is lost to server
// Proper error message on updateing the table
//[Suggestion] In side bar we can add tickets id specific to that user

import React, { useEffect, useState } from "react";
// import CssBaseline from '@material-ui/core/CssBaseline'
// import {SelectFilter,Records} from '../components/Tables/Table'
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Modal, Button } from 'react-bootstrap'
import Navbar from "../components/Navbar";


import axios from 'axios';
import '../styles/admin.css';
const BASE_URL = 'http://127.0.0.1:8080';

function Admin() {
    const [userList, setUserList] = useState([]);
    const [userDetail, setUserDetail] = useState({
        'email': "nandi@gmail.com",
        'name': "Nandi",
        'userId': "nandi131",
        'userStatus': "PENDING",
        'userTypes': "ENGINEER"
    });
    const [sidebar, setSidebar] = useState(false);
    const [message, setMessage] = useState("");

    const showSidebar = () => setSidebar(true);
    const closeSideBar = () => {
        setSidebar(false);
        setUserDetail({});
    }

    // const theme = createMuiTheme({
    //     palette: {
    //       primary: {
    //         main: '#4caf50',
    //       },
    //       secondary: {
    //         main: '#ff9100',
    //       },
    //     },

    //   });


    useEffect(() => {
        (async () => {
            setUserList([{
                'email': "atulsingh15743gmail.com",
                'name': "Atul",
                'userId': "admin",
                'userStatus': "APPROVED",
                'userTypes': "ADMIN"
            },
            {
                'email': "aksinghsubscriptions@gmail.com",
                'name': "Utkarshini",
                'userId': "CUSTOMER",
                'userStatus': "APPROVED",
                'userTypes': "ADMIN"
            },
            {
                'email': "bilalgmail.com",
                'name': "Bilal",
                'userId': "bilal101",
                'userStatus': "APPROVED",
                'userTypes': "CUSTOMER"
            },
            {
                'email': "nandi@gmail.com",
                'name': "Nandi",
                'userId': "nandi131",
                'userStatus': "PENDING",
                'userTypes': "ENGINEER"
            },
            {
                'email': "Morgangmail.com",
                'name': "Morgan",
                'userId': "102",
                'userStatus': "PENDING",
                'userTypes': "ENGINEER"
            },
            {
                'email': "Dilipmail.com",
                'name': "Dilip",
                'userId': "104",
                'userStatus': "PENDING",
                'userTypes': "ENGINEER"
            }

            ])
        })();
    }, []);

    const fetchUsers = (userId) => {
        console.log(userId);
        axios.get(BASE_URL + '/crm/api/v1/users/' + userId, {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }).then(function (response) {
            if (response.status == 200) {
                if (userId) {
                    setUserDetail(response.data[0])
                    showSidebar()
                }
                else
                    setUserList(response.data);
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }



    const updateUserDetail = () => {
        // Need to test
        const data = {
            "userType": userDetail.userType,
            "userStatus": userDetail.userType,
            "userName": userDetail.name
        }
        axios.put(BASE_URL + '/crm/api/v1/users/' + localStorage.getItem("userId"), {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }).then(function (response) {
            if (response.status == 200) {
                console.log(response);
                setMessage(response.message);
                let idx = userList.findIndex((obj => obj.userId == userDetail.userId));
                userList[idx] = userDetail
                closeSideBar();

            }
        })
            .catch(function (error) {
                if (error.status == 400)
                    setMessage(error.message);
                else
                    console.log(error);
            });
    }

    const changeUserDetail = (e) => {
        if (e.target.name == "status")
            userDetail.userStatus = e.target.value
        else if (e.target.name == "name")
            userDetail.name = e.target.value
        else if (e.target.name == "type")
            userDetail.userTypes = e.target.value
        setUserDetail(userDetail)
        setSidebar(e.target.value);
    }


    // const userColumns = React.useMemo(
    //     () => [
    //       {
    //         Header: 'USER ID',
    //         accessor: 'userId',
    //         Cell: ({ cell: { value } }) => {
    //         return(
    //              <u key={value} onClick={() => fetchUsers(value)}>{value}</u>
    //         )
    //         }
    //       },
    //       {
    //         Header: 'USER NAME',
    //         accessor: 'name',
    //       },
    //       {
    //         Header: 'EMAIL',
    //         accessor: 'email',
    //       },
    //       {
    //         Header: 'ROLE',
    //         accessor: 'userTypes',
    //         Filter: SelectFilter,
    //         filter: "includes"
    //       },
    //       {
    //         Header: 'STATUS',
    //         accessor: 'userStatus',
    //         Filter: SelectFilter,
    //         filter: "includes"
    //       }
    //     ],
    //     []
    //   )



    return (
        <div className="bg-light">
            <Navbar />


            <div className="container">
                <h3 className="text-primary text-center">Welcome, {userDetail.name}</h3>
                <p className="text-muted text-center">Take a quick looks at your admin stats below. </p>

                {/* card */}
                <div className="row my-5 text-center">

                    <div className="col">
                        <div className="card shadow  bg-success" style={{ width: 16 + 'rem' }}>
                            <div className="card-body">
                                <h5 className="card-subtitle mb-2 text-white">Completed</h5>
                                <hr />
                                <div className="col text-white">Some value</div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card shadow bg-warning" style={{ width: 16 + 'rem' }}>
                            <div className="card-body">
                                <h5 className="card-subtitle mb-2 text-white">Warning</h5>
                                <hr />
                                <div className="col text-white">Some value</div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card shadow bg-primary" style={{ width: 16 + 'rem' }}>
                            <div className="card-body">
                                <h5 className="card-subtitle mb-2 text-white">Primary</h5>
                                <hr />
                                <div className="col text-white">Some value</div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card shadow bg-danger" style={{ width: 16 + 'rem' }}>
                            <div className="card-body">
                                <h5 className="card-subtitle mb-2 text-white">Pending</h5>
                                <hr />
                                <div className="col text-white">Some value</div>
                            </div>
                        </div>
                    </div>

                </div>

               <hr />

                <Button variant="primary" onClick={showSidebar}>
                    Btn
                </Button>
                {/* <MuiThemeProvider theme={theme}> */}
                <MaterialTable
                    onRowClick={(event, rowData) => fetchUsers(rowData.userId)}

                    data={userList}
                    columns={[
                        {
                            title: "USER ID",
                            field: "userId",
                        },
                        {
                            title: "Name",
                            field: "name",

                        },
                        {
                            title: "EMAIL",
                            field: "email",
                            filtering: false
                        },
                        {
                            title: "ROLE",
                            field: "userTypes",
                            lookup: {
                                "ADMIN": "ADMIN",
                                "CUSTOMER": "CUSTOMER",
                                "ENGINEER": "ENGINEER",

                            },
                        },
                        {
                            title: "Status",
                            field: "userStatus",
                            lookup: {
                                "APPROVED": "APPROVED",
                                "PENDING": "PENDING",
                                "CANCELED": "CANCELED",

                            },
                        },
                    ]}
                    options={{
                        filtering: true,
                        sorting: true,
                        exportMenu: [{
                            label: 'Export PDF',
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'userRecords')
                        }, {
                            label: 'Export CSV',
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'userRecords')
                        }],
                        headerStyle: {
                            backgroundColor: '#106cfc',
                            color: '#FFF'
                          },
                          rowStyle: {
                            backgroundColor: '#EEE',
                          }
                    }}
                    title="USER RECORDS"
                />
                {/* </MuiThemeProvider>  */}



                {sidebar ? (

                    <Modal
                        show={sidebar}
                        onHide={closeSideBar}
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title >Edit Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={updateUserDetail} >

                                <div className="p-1">
                                    <h5 className="card-subtitle mb-2 text-primary lead">User ID: {userDetail.userId}</h5>
                                    <hr />
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon2">Name</span>
                                        <input type="text" className="form-control" name="name" value={userDetail.name} onChange={changeUserDetail} />

                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon2">Email</span>
                                        <input type="text" className="form-control" name="name" value={userDetail.email} onChange={changeUserDetail} disabled />

                                    </div>

                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon2">Type</span>
                                        <select className="form-select" name="type" value={userDetail.userTypes} onChange={changeUserDetail}>
                                            <option value="ADMIN">ADMIN</option>
                                            <option value="CUSTOMER">CUSTOMER</option>
                                            <option value="ENGINEER">ENGINEER</option>
                                        </select>

                                    </div>

                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon2">Status</span>
                                        <select name="status" className="form-select"
                                            value={userDetail.userStatus} onChange={changeUserDetail}>
                                            <option value="APPROVED">APPROVED</option>
                                            <option value="REJECTED">REJECTED</option>
                                            <option value="PENDING">PENDING</option>
                                        </select>

                                    </div>

                                </div>

                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => closeSideBar()}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => updateUserDetail()}>Update</Button>
                        </Modal.Footer>
                    </Modal>

                ) : (
                    ""
                )}
                 <br />
                {/* <MuiThemeProvider theme={theme}> */}
                <MaterialTable
                    onRowClick={(event, rowData) => fetchUsers(rowData.userId)}

                    data={userList}
                    columns={[
                        {
                            title: "TICKET ID",
                            field: "userId",


                        },
                        {
                            title: "Name",
                            field: "name",

                        },
                        {
                            title: "EMAIL",
                            field: "email",
                            filtering: false
                        },
                        {
                            title: "ROLE",
                            field: "userTypes",
                            lookup: {
                                "ADMIN": "ADMIN",
                                "CUSTOMER": "CUSTOMER",
                                "ENGINEER": "ENGINEER",

                            },
                        },
                        {
                            title: "Status",
                            field: "userStatus",
                            lookup: {
                                "APPROVED": "APPROVED",
                                "PENDING": "PENDING",
                                "CANCELED": "CANCELED",

                            },
                        },
                    ]}
                    options={{
                        filtering: true,
                        sorting: true,
                        exportMenu: [{
                            label: 'Export PDF',
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'userRecords')
                        }, {
                            label: 'Export CSV',
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'userRecords')
                        }],
                        headerStyle: {
                            backgroundColor: '#106cfc',
                            color: '#FFF'
                          },
                          rowStyle: {
                            backgroundColor: '#EEE',
                          }

                    }}
                    title="TICKET RECORDS"
                />
                {/* </MuiThemeProvider>  */}



                {sidebar ? (

                    <Modal
                        show={sidebar}
                        onHide={closeSideBar}
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title >Edit Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={updateUserDetail} >

                                <div className="p-1">
                                    <h5 className="card-subtitle mb-2 text-primary lead">User ID: {userDetail.userId}</h5>
                                    <hr />
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon2">Name</span>
                                        <input type="text" className="form-control" name="name" value={userDetail.name} onChange={changeUserDetail} />

                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon2">Email</span>
                                        <input type="text" className="form-control" name="name" value={userDetail.email} onChange={changeUserDetail} disabled />

                                    </div>

                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon2">Type</span>
                                        <select className="form-select" name="type" value={userDetail.userTypes} onChange={changeUserDetail}>
                                            <option value="ADMIN">ADMIN</option>
                                            <option value="CUSTOMER">CUSTOMER</option>
                                            <option value="ENGINEER">ENGINEER</option>
                                        </select>

                                    </div>

                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon2">Status</span>
                                        <select name="status" className="form-select"
                                            value={userDetail.userStatus} onChange={changeUserDetail}>
                                            <option value="APPROVED">APPROVED</option>
                                            <option value="REJECTED">REJECTED</option>
                                            <option value="PENDING">PENDING</option>
                                        </select>

                                    </div>

                                </div>

                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => closeSideBar()}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => updateUserDetail()}>Update</Button>
                        </Modal.Footer>
                    </Modal>

                ) : (
                    ""
                )}
            </div>









            {/* <div className="row my-4">


                {/*     table map values here, search here */}
            {/* <div className="card shadow" >
                <div class="table-responsive">

                    
                        <div><h4 className="card-subtitle center m-2 text-primary">USER RECORDS</h4></div>
                        <CssBaseline />
                        <Records columns={userColumns} data={userList} />
                    </div>
                </div> */}



            {/* Form update user details here  */}


            {/* </div> */}



        </div>
    )

}

export default Admin;

{/* cards section */ }
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


