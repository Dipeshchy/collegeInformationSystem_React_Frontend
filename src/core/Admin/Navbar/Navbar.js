import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link navbar-brand" to="/admin/dashboard">Admin Module</Link>
                    </li>
                </ul>
            </div>
            <div className="mx-auto order-0">
                <Link className="navbar-brand mx-auto" to="/">
                    College Information System
              </Link>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <span className="nav-link">Man Bahadur</span>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link">Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;