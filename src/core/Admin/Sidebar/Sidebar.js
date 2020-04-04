import React from 'react';
import { Link, withRouter } from 'react-router-dom';

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
                        <li className={`list-group-item ${this.props.location.pathname.includes('dashboard') ? 'active' : null}`}>
                            <Link to="/admin/dashboard" className={`${this.props.location.pathname.includes('dashboard') && 'text-white'}`} style={linkStyles}>
                                Dashboard
                      </Link>
                        </li>

                        <li className={`list-group-item ${this.props.location.pathname.includes('adminlist') ? 'active' : null}`}>
                            <Link to="/admin/adminlist" className={`${this.props.location.pathname.includes('adminlist') && 'text-white'}`} style={linkStyles}>
                                Admin
  </Link>
                        </li>
                        <li className={`list-group-item ${this.props.location.pathname.includes('university') ? 'active' : null}`}>
                            <Link to="/admin/university" className={`${this.props.location.pathname.includes('university') && 'text-white'}`} style={linkStyles}>
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

export default withRouter(Sidebar);