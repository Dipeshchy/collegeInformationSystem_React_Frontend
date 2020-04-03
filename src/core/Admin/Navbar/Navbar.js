import React from 'react';

const Navbar = ({ fullName }) => {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link navbar-brand" href="#">Admin Module</a>
                    </li>
                </ul>
            </div>
            <div className="mx-auto order-0">
                <a className="navbar-brand mx-auto" href="#">
                    College Information System
              </a>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <span className="nav-link">{fullName}</span>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Log Out</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;