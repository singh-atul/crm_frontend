import logo from '../assets/logo.svg'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
  <div className="container-fluid px-5">
    <a className="navbar-brand" href="#"><img src={logo}/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className=" me-auto mb-2 mb-lg-0">
        
        
      </ul>
      <form className="d-flex">
     
        <button className="btn btn-outline-primary" type="submit">Logout</button>
      </form>
    </div>
  </div>
</nav>
    )
}



export default Navbar;