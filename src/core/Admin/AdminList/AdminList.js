import React from 'react';
import AdminListBody from './AdminListBody';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

class AdminList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar />
                        <div style={{ marginTop: '100px' }} className="col-md-10">
                            <AdminListBody />
                        </div>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

export default AdminList;