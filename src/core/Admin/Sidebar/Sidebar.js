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
            <nav class="mt-5 col-md-2 d-none d-md-block bg-light sidebar">
                <div class="sidebar-sticky">
                    <ul class="mt-5 list-group nav flex-column">
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
                            <a href="#" style={linkStyles}>
                                Universities
  </a>
                        </li>
                        <li className="list-group-item">
                            <a href="#" style={linkStyles}>
                                Colleges
  </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Sidebar;