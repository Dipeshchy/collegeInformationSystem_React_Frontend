import React from 'react';
import { connect } from 'react-redux';
import { adminLogOut } from '../../../store/actions/admin/loginAction'
import {  withRouter } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import DashboardBody from './DashboardBody';

class Dashboard extends React.Component {

  logOut = () => {
    this.props.adminLogOut();
    this.props.history.push('/login')
  }
  render() {
    // const loginData = localStorage.getItem('loggedInData');
    // if (this.props.location.pathname.includes('admin')) {
    //   if (!loginData) {
    //     return <Redirect to="/login" />
    //   }
    // }
   
    return (
      <React.Fragment>
        <Navbar />

        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <div style={{marginTop: '100px'}} className="col-md-10">
              <DashboardBody />
            </div>
          </div>

        </div>
      </React.Fragment>

    )
  }
}

export default connect(null, { adminLogOut })(withRouter(Dashboard));