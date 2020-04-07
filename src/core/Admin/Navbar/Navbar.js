import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends React.Component {
    state = {
        name: ''
    }
    logOut = () => {
        localStorage.removeItem('loggedInData');
        this.props.history.push('/')
    }

    componentDidMount() {
        if (!localStorage.getItem('loggedInData')) {
            if (this.props.location.pathname.includes('admin')) {
                this.props.history.push('/login')
            }
        } else {
            let loginData = localStorage.getItem('loggedInData')
            let data = JSON.parse(loginData)
            this.setState({ name: data.fullName ? data.fullName : '' })
        }
    }
    render() {
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
                    <ul className="navbar-nav ml-auto mr-5">
                        {/* <li className="nav-item">
                        <span className="nav-link">Man Bahadur</span>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link">Logout</button>
                    </li> */}

                        {/* Dropdown */}

                        <div className="dropdown">
                            <li className="nav-item" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="nav-link">{this.state.name}</span>
                            </li>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button
                                    onClick={() => this.props.history.push('/admin/adminlist/myprofile')}
                                    className="dropdown-item">
                                    My Profile
                                    </button>
                                <button
                                    onClick={() => this.props.history.push('/admin/adminlist/myprofile/update')}
                                    className="dropdown-item">
                                    Update Profile
                                    </button>
                                <button onClick={() => this.logOut()}
                                    className="dropdown-item">Log out</button>
                            </div>
                        </div>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);