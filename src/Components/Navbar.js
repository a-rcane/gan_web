import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', paddingTop: '10px', paddingLeft: '20px', paddingRight: '20px' }}>
        <div className="container-fluid">
          {/* <a className="navbar-brand text-light" href="#">
            
          </a> */}
          <Link className="navbar-brand text-light" to={"/"}><h2>De-Blur</h2></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <ul className="navbar-nav ml-auto">
              
              <li className="nav-item">
                
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Features
                </a>
                <ul className="dropdown-menu">
                  <li>
                    {/* <a  href="#">
                      
                    </a> */}
                    <Link className="dropdown-item" to={"/feature"}>Deblur Image</Link>
                  </li>
                  {/* <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li> */}
                </ul>
              </li>
            </ul>
            
            <Link style={{textDecoration: 'none'}} to={"/signin"}><button className="btn btn-outline-secondary"  type="submit">     
              Sign In
            </button></Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
