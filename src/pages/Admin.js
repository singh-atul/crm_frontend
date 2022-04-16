import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Modal, Button, ProgressBar } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import Chart from '../components/Chart'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';





import axios from 'axios';
import '../styles/admin.css';
import Footer from "../components/Footer";
const BASE_URL = 'http://127.0.0.1:8080';

function Admin() {
    const [userList, setUserList] = useState([]);
    const [userDetail, setUserDetail] = useState({

    });
    const [sidebar, setSidebar] = useState(false);
    const [message, setMessage] = useState("");
    const [currUserName, setCurrUserName] = useState(localStorage.getItem("name"));
    const showSidebar = () => setSidebar(true);
    const closeSideBar = () => {
        setSidebar(false);
        setUserDetail({});
    }



    useEffect(() => {
        (async () => {
            fetchUsers("")
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
        const data = {
            "userType": userDetail.userTypes,
            "userStatus": userDetail.userStatus,
            "userName": userDetail.name
        }
        axios.put(BASE_URL + '/crm/api/v1/users/' + userDetail.userId, data, {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }, {
            "userId": localStorage.getItem("userId")
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

    return (
        <div className="row bg-light">
            <div className="col-1"><Sidebar home='/' /></div>
            <div className="col my-4">
                <div className="container ">


                    <div >
                        <h3 className="text-primary text-center">Welcome, {currUserName}</h3>
                        <p className="text-muted text-center">Take a quick looks at your admin stats below. </p>
                      

                        {/* card */}
                        <div className="row my-5 ">

                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card  cardItem shadow-lg  bg-primary text-dark bg-opacity-25 borders-b" style={{ width: 15 + 'rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-subtitle mb-2"><i class="bi bi-pencil text-primary mx-2"></i>Open </h5>
                                        <hr />
                                        <div className="row">
                                            <div className="col">  <h1 className="col text-dark mx-4">8</h1> </div>
                                            <div className="col">
                                                <div style={{ width: 40, height: 40 }}>
                                                    <CircularProgressbar value={80} styles={buildStyles({
                                                        textColor: "red",
                                                        pathColor: "darkblue",
                                                    })} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card shadow-lg  bg-warning text-dark bg-opacity-25 borders-y" style={{ width: 15 + 'rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-subtitle mb-2"><i class="bi bi-lightning-charge text-warning mx-2"></i>Progress </h5>
                                        <hr />
                                        <div className="row">
                                            <div className="col">  <h1 className="col text-dark mx-4">4</h1> </div>
                                            <div className="col">
                                                <div style={{ width: 40, height: 40 }}>
                                                    <CircularProgressbar value={80} styles={buildStyles({
                                                        textColor: "red",
                                                        pathColor: "darkgoldenrod",
                                                    })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card shadow-lg  bg-success text-dark bg-opacity-25 borders-g" style={{ width: 15 + 'rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-subtitle mb-2"><i class="bi bi-check2-circle text-success mx-2"></i>Closed </h5>
                                        <hr />
                                        <div className="row">
                                            <div className="col">  <h1 className="col text-dark mx-4">2</h1> </div>
                                            <div className="col">
                                                <div style={{ width: 40, height: 40 }}>
                                                    <CircularProgressbar value={80} styles={buildStyles({
                                                        textColor: "red",
                                                        pathColor: "darkolivegreen",
                                                    })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card shadow-lg bg-secondary text-dark bg-opacity-25 borders-grey" style={{ width: 15 + 'rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-subtitle mb-2"><i class="bi bi-slash-circle text-secondary mx-2"></i>Blocked </h5>
                                        <hr />
                                        <div className="row">
                                            <div className="col">  <h1 className="col text-dark mx-4">2</h1> </div>
                                            <div className="col">
                                                <div style={{ width: 40, height: 40 }}>
                                                    <CircularProgressbar value={20} styles={buildStyles({
                                                        textColor: "red",
                                                        pathColor: "black",
                                                    })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <hr />
                        
                        <div className="row my-5">
                            <div className="col-lg-9 col-xs-12 ">
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
                                        "REJECTED": "REJECTED",

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
                                    backgroundColor: 'darkblue',
                                    color: '#FFF'
                                },
                                rowStyle: {
                                    backgroundColor: '#EEE',
                                }
                            }}
                            title="USER RECORDS"
                        />
                        {/* </MuiThemeProvider>  */}
                            </div>
                            <div className="col-lg-3 col-xs-12"><Chart /></div>
                        </div>

                       



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
                                    backgroundColor: 'darkblue',
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

                </div>
               
            </div>
            <Footer />
        </div>

    )

}

export default Admin;
