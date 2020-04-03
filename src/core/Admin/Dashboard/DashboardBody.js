import React from 'react';
import axios from 'axios';

class DashboardBody extends React.Component {

    state = {
        adminCount: null,
        universityCount: null,
        collegeCount: null,
        courseCount: null
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/admin/dashboard')
            .then(res => {
                if(res.status === 200) {
                    this.setState({
                        ...res.data
                    })
                }
            })
            .catch(er => console.log(er))
    }
    render() {
        const { adminCount,
             courseCount,
            universityCount,
            collegeCount
            } = this.state;
        return (
            <div className="card">
                <div className="card-header">Dashboard</div>
                <div className="card-body">
                    <div className="row">

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Admin</div>
        <div className="h5 mb-0 font-weight-bold text-gray-800">{adminCount}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div 
                                            className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total University</div>
        <div className="h5 mb-0 font-weight-bold text-gray-800">{universityCount}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total College</div>
        <div className="h5 mb-0 font-weight-bold text-gray-800">{collegeCount}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Course</div>
        <div className="h5 mb-0 font-weight-bold text-gray-800">{courseCount}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardBody;