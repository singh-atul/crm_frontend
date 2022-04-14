import { CFooter, CLink } from '@coreui/react';

function Footer(){
    return(
        <div className='mx-5' >
            <hr />
  <div className='mx-5'>
      <div className="row">
          <div className="col">
          <CLink href="/" className="text-decoration-none text-black">TETHERX</CLink>
    <span>&copy; 2022 TETHERX.</span>
          </div>
          <div className="col d-flex justify-content-end">
          <span>Powered by </span>
    <CLink href="/" className="text-decoration-none text-black">  &copy; TETHERX</CLink>
          </div>
      </div>
    
  </div>
  <div>
   
  </div>
</div>
    )
}

export default Footer;