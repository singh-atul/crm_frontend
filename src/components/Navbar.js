import logo from '../assets/logo.svg'

import {LogoutBtn} from './Logout'
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white px-5">
          <div className="container-fluid px-5">
            <a className="navbar-brand" href="#"></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>   
              <div  className=" text-right ">
              <LogoutBtn/> 
                </div> 
                 
          </div>
</nav>
    )
}



export default Navbar;