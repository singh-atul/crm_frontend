const LogoutBtn = () => {
  
    const logoutBtn = e => {
      e.preventDefault()
      localStorage.clear();
      window.location.href ="/"
      console.log("Logged out");
    }
  
    return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className=" me-auto mb-2 mb-lg-0">
                <form className="d-flex" onSubmit={logoutBtn}>
                    <label className="text-white" type="submit">Logout</label>
                </form>
            </ul>
        </div>
    )
  
  }
  
  export {LogoutBtn}