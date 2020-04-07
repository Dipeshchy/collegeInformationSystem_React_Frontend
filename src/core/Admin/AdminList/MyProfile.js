import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';

class MyProfile extends React.Component {
    state = {
        name: '',
        email: '',
        id: null
    }
    componentDidMount() {
        let loginData = localStorage.getItem('loggedInData')
        let data = JSON.parse(loginData)
        if (data) {
            this.setState({
                name: data.fullName ? data.fullName : '',
                email: data.email ? data.email : '',
                id: data.id ? data.id : null
            })
        }
    }
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar />
                        <div style={{ marginTop: '100px' }} className="col-md-10">
                            <div className="card">
                                <div className="card-header">
                                    My Profile
                                </div>
                                <div className="card-body">
                                    <div className="card">
                                        <div className="card-body">
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <h6>Fullname : {this.state.name} </h6>
                                                </li>
                                                <li  className="list-group-item">
                                                    <h6>Email : {this.state.email} </h6>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-footer">
                                            <Link 
                                            className="btn btn-outline-info"
                                            to="/admin/adminlist/myprofile/update">
                                                Update Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default MyProfile;