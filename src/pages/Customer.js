import "../styles/admin.css"

 
import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Modal, Button } from 'react-bootstrap'
import Navbar from "../components/Navbar";

import axios from 'axios';
import '../styles/admin.css';

const BASE_URL ="http://127.0.0.1:8080"



function User() {
        const [ticketDetails, setTicketDetails] = useState([]);
        const [ticketCreationModal, setTicketCreationModal] = useState(false);
        const [ticketUpdateModal, setTicketUpdateModal] = useState(false);
        
        const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
        const [ticketStatusCount, setTicketStatusCount] = useState({});
        
        const closeTicketCreationModal = () => setTicketCreationModal(false)
        const closeTicketUpdationModal = () => setTicketUpdateModal(false)
        const updateSelectedCurrTicket = (data) =>{
            setSelectedCurrTicket(data)
            console.log("-->",data.title);
        }
        const [message, setMessage] = useState("");
        const currUserName = useState(localStorage.getItem("name"));

        useEffect(() => {
          (async () => {
              fetchTickets()
          })();
        }, []);

        const updateTicketCounts = (tickets) =>{
            console.log('$$$')
            const data = {
                pending:0,
                closed:0,
                progress:0,
                blocked:0

            }
            tickets.map(x=>{
                console.log(x.status)
                if(x.status=="OPEN")
                    data.pending+=1
                else if(x.status=="IN_PROGRESS")
                    data.progress+=1
                else if(x.status=="BLOCKED")
                    data.blocked+=1
                else
                    data.closed+=1
            })
            setTicketStatusCount(Object.assign({}, data))
        }
        const fetchTickets = () => {
          axios.get(BASE_URL + '/crm/api/v1/tickets/',
              {
                  headers: {
                  'x-access-token': localStorage.getItem("token")
              }
            },{
                  "userId":localStorage.getItem("userId")
              }
          ).then(function (response) {
              if (response.status === 200) {
                    console.log(response.data)
                    setTicketDetails(response.data);
                    updateTicketCounts(response.data)
              }
          })
              .catch(function (error) {
                  console.log(error);
              });
        }


      const createTicket = (e)=>{
        e.preventDefault()
        const data={
             title:e.target.title.value,
             description:e.target.description.value
        }
        axios.post(BASE_URL + '/crm/api/v1/tickets/',data,{
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }).then(function (response){
            setMessage("Ticket Created Successfully");
            closeTicketCreationModal();
            fetchTickets();

        }).catch(function (error){
            if (error.status === 400)
                    setMessage(error.message);
            else
                console.log(error);
        })

      }

      const updateTicket = (e) =>{
        e.preventDefault()
        axios.put(BASE_URL + '/crm/api/v1/tickets/'+ selectedCurrTicket.id,selectedCurrTicket, {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        },{
            "userId":localStorage.getItem("userId")
        }).
        then(function (response){
            setMessage("Ticket Updated Successfully");
            closeTicketUpdationModal();
            fetchTickets();

        }).catch(function (error){
            if (error.status === 400)
                setMessage(error.message);
            else if(error.status === 401)
                setMessage("Authorization error, retry loging in");
                closeTicketUpdationModal();
            console.log(error.message);
        })


      }

      const editTicket = (ticketDetail) =>{
        const ticket={
            assignee: ticketDetail.assignee,
            description: ticketDetail.description,
            id:ticketDetail.id,
            reporter: ticketDetail.reporter,
            status: ticketDetail.status,
            title:ticketDetail.title
        }
        setSelectedCurrTicket(ticket)
        setTicketUpdateModal(true)
      }

      const onTicketUpdate = (e)=>{
        if(e.target.name=="title")
            selectedCurrTicket.title = e.target.value
        else if(e.target.name==="description")
            selectedCurrTicket.description = e.target.value
        updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket) )
    }




  
      return (
          <div className="bg-light">
              <Navbar />
              <div className="container">
                  <h3 className="text-primary text-center">Welcome, {currUserName}</h3>
                  <p className="text-muted text-center">Take a quick looks at your admin stats below. </p>
  
                  {/* card */}
                  <div className="row my-5 text-center">
  
                      <div className="col">
                          <div className="card shadow  bg-success" style={{ width: 16 + 'rem' }}>
                              <div className="card-body">
                                  <h5 className="card-subtitle mb-2 text-white">Closed Ticket</h5>
                                  <hr />
                                  <div className="col text-white">{ticketStatusCount.closed} Tickets</div>
                              </div>
                          </div>
                      </div>
  
                      <div className="col">
                          <div className="card shadow bg-warning" style={{ width: 16 + 'rem' }}>
                              <div className="card-body">
                                  <h5 className="card-subtitle mb-2 text-white">Open Tickets</h5>
                                  <hr />
                                  <div className="col text-white">{ticketStatusCount.progress} Tickets</div>
                              </div>
                          </div>
                      </div>
  
                      <div className="col">
                          <div className="card shadow bg-primary" style={{ width: 16 + 'rem' }}>
                              <div className="card-body">
                                  <h5 className="card-subtitle mb-2 text-white">Pending Tickets</h5>
                                  <hr />
                                  <div className="col text-white">{ticketStatusCount.pending} Tickets</div>
                              </div>
                          </div>
                      </div>
  
                      <div className="col">
                          <div className="card shadow bg-danger" style={{ width: 16 + 'rem' }}>
                              <div className="card-body">
                                  <h5 className="card-subtitle mb-2 text-white">Blocked Tickets</h5>
                                  <hr />
                                  <div className="col text-white">{ticketStatusCount.blocked} Tickets</div>
                              </div>
                          </div>
                      </div>
  
                  </div>
  
                 <hr />

                 <p class="text-success">{message}</p>
                  {/* <MuiThemeProvider theme={theme}> */}
                  <MaterialTable
                      onRowClick={(event,rowData) => editTicket(rowData)}
  
                      data={ticketDetails}
                      columns={[
                          {
                              title: "Ticket ID",
                              field: "id",
                          },
                          {
                              title: "TITLE",
                              field: "title",
  
                          },
                          {
                              title: "DESCRIPTIONS",
                              field: "description",
                              filtering: false
                          },
                          {
                              title: "REPORTER",
                              field: "reporter",
                          },
                          {
                              title: "PRIORITY",
                              field: "ticketPriority",
                          },
                          {
                              title: "ASSIGNEE",
                              field: "assignee",
                          },
                          {
                              title: "Status",
                              field: "status",
                              lookup: {
                                  "OPEN": "OPEN",
                                  "IN_PROGRESS": "IN_PROGRESS",
                                  "BLOCKED": "BLOCKED",
                                  "CLOSED":"CLOSED"
  
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
                      title="TICKETS RAISED BY YOU"
                  />
                  <input type="submit" className="form-control btn btn-primary" value="RAISE TICKET" onClick={()=>setTicketCreationModal(true)} />

                {
                    ticketCreationModal ? (
                        <Modal
                          show={ticketCreationModal}
                          onHide={closeTicketCreationModal}
                          backdrop="static"
                          keyboard={false}
                          centered
                      >
                          <Modal.Header closeButton>
                              <Modal.Title >CREATE TICKETS</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={createTicket} >
                                <div className="p-1">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon2">Title</span>
                                        <input type="text" className="form-control" name="title"  required/>
                                    </div>
                                    <div class="md-form amber-textarea active-amber-textarea-2">
                                        <textarea id="form16" class="md-textarea form-control" rows="3" name="description" placeholder="Description" required></textarea>
                                    </div>
                                </div>
                                
                                <Button variant="secondary" onClick={() => closeTicketCreationModal()}>Cancel</Button>
                                <Button type="submit" variant="primary" >Create</Button>
                            </form>
                          </Modal.Body>
                          <Modal.Footer>
                          </Modal.Footer>


                      </Modal>
                    ):(
                        ""
                    )

                }

                {
                    ticketUpdateModal ? (
                        <Modal
                          show={ticketUpdateModal}
                          onHide={closeTicketUpdationModal}
                          backdrop="static"
                          keyboard={false}
                          centered
                      >
                          <Modal.Header closeButton>
                              <Modal.Title >UPDATE TICKET</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={updateTicket} >
                                <div className="p-1">
                                      <h5 className="card-subtitle mb-2 text-primary lead">Ticket ID: {selectedCurrTicket.id}</h5>
                                      <hr />
                                      <div class="input-group mb-3">
                                          <span class="input-group-text" id="basic-addon2">Title</span>
                                          <input type="text" className="form-control" name="title" value={selectedCurrTicket.title} onChange={onTicketUpdate} required/>
  
                                      </div>
                                      <div class="input-group mb-3">
                                          <span class="input-group-text" id="basic-addon2">Assignee</span>
                                          <input type="text" className="form-control"  value={selectedCurrTicket.assignee} disabled />
                                      </div>
                                      <div class="input-group mb-3">
                                          <span class="input-group-text" id="basic-addon2">Status</span>
                                          <input type="text" className="form-control" value={selectedCurrTicket.status}  disabled />
                                      </div>
                                      <div class="md-form amber-textarea active-amber-textarea-2">
                                        <textarea id="form16" class="md-textarea form-control" rows="3" name="description" placeholder="Description" value={selectedCurrTicket.description}  onChange={onTicketUpdate} required></textarea>
                                      </div>
                                  </div>
                                
                                <Button variant="secondary" onClick={() => closeTicketUpdationModal()}>Cancel</Button>
                                <Button type="submit" variant="primary" >Update</Button>
                            </form>
                          </Modal.Body>
                          <Modal.Footer>
                          </Modal.Footer>


                      </Modal>
                    ):(
                        ""
                    )

                }
                
                   
              </div>
  
          </div>
      )
  
  }
  
  export default User;