import "../styles/admin.css"

 
function User() {

    return (
        <div className="container my-2">
            <h3 className="text-success">CUSTOMER DASHBOARD</h3>

            {/* cards section */}
            <div className="row">

                <div className="col">
                    <div className="card shadow" style={{ width: 15 + 'rem' }}>
                        <div className="card-body">
                            <h5 className="card-subtitle mb-2 text-success">Card 1</h5>
                            <hr />
                            <div className="col">Some value</div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card shadow" style={{ width: 15 + 'rem' }}>
                        <div className="card-body">
                            <h5 className="card-subtitle mb-2 text-success">Card 1</h5>
                            <hr />
                            <div className="col">Some value</div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card shadow" style={{ width: 15 + 'rem' }}>
                        <div className="card-body">
                            <h5 className="card-subtitle mb-2 text-success">Card 1</h5>
                            <hr />
                            <div className="col">Some value</div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card shadow" style={{ width: 15 + 'rem' }}>
                        <div className="card-body">
                            <h5 className="card-subtitle mb-2 text-success">Card 1</h5>
                            <hr />
                            <div className="col">Some value</div>
                        </div>
                    </div>
                </div>

            </div>


            <div className="row my-4">
                {/*     table
                    map values here, search here
                    */}
                <div className="col">
                    <div className="card shadow" style={{ width: 50.7 + 'rem' }}>
                        <div className="card-body">
                            <h5 className="card-subtitle mb-2 text-success">Get Tickets</h5>

                            <div >
                                <div className="input-group my-1">
                                    <input type="text" className="form-control" placeholder="Search..." id="search" /><i className="bi bi-search btn btn-outline-secondary text-success"></i>
                                </div>
                                <table className="table table-borderless">

                                    <thead className="bg-light">
                                        <tr>
                                            <th scope="col">Ticket Id</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Priority</th>
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
                            <h5 className="card-subtitle mb-2 text-success">Edit Ticket</h5>
                            <hr />
                            <div className="col">
                                <div>
                                    <div className="input-group m-1">
                                        <input type="text" className="form-control" placeholder="Title" id="username" />
                                    </div>
                                    <div className="input-group m-1">
                                        <input type="text" className="form-control" placeholder="Description" id="email" />
                                    </div>
                                    <div className="input-group m-1">
                                        <input type="password" className="form-control" placeholder="Priority" id="password" />
                                    </div>
                                    <div className="input-group m-1">
                                        <input type="password" className="form-control" placeholder="Status" id="password" />
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
                                            <button className="btn btn-success">Submit</button>
                                        </div>


                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


       
        </div>
    )
}

export default User;