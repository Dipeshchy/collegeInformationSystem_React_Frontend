import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
    render() {
        const linkStyles = {
            // color: 'white',
            fontFamily: 'sans-serif',
            fontWeight: '900',
            cursor: 'pointer',
            textDecoration: 'none',
            fontSize: '18px'
        }
        return (
            <nav className="mt-5 col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="mt-5 list-group nav flex-column">
                        <li className="list-group-item">
                            <Link to="/admin/dashboard" style={linkStyles}>
                                Dashboard
                      </Link>
                        </li>

                        <li className="list-group-item">
                            <Link to="/admin/adminlist" style={linkStyles}>
                                Admin
  </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/university" style={linkStyles}>
                                Universities
  </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/college" style={linkStyles}>
                                Colleges
  </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Sidebar;