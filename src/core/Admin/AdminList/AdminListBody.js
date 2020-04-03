import React from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import customStyles from '../components/table/customStyles';
import axios from 'axios';

class AdminListBody extends React.Component {
    state = {
        loading: true,
        message: null,
        msgStatus: 'success',
        adminList: []
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/admin')
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.setState({
                        adminList: res.data,
                        loading: false
                    })
                } else {
                    this.setState({
                        loading: false,
                        message: 'Failed Loading',
                        msgStatus: 'danger'
                    })
                }
            }).catch(er => console.log(er))
    }
    render() {
        const { adminList, message, msgStatus, loading } = this.state;
        const columns = [
            {
                name: 'Id',
                selector: 'id',
                width: '50px',
                sortable: true
            },
            {
                name: 'Fullname',
                selector: 'fullName',
                width: '500px',
                sortable: true
            },
            {
                name: 'Email',
                selector: 'email',
                width: '500px',
                sortable: true
            },
            {
                name: 'Edit',
                cell: row =>
                    <Link
                        to={{ pathname: `/admin/adminlist/edit/${row.id}` }}
                        className='btn btn-sm btn-outline-primary'>
                        Edit
                    </Link>,
                right: true,
            },
            {
                name: 'Delete',
                cell: row =>
                    <button
                        className='btn btn-sm btn-outline-danger'>
                        Delete
                    </button>,
                right: true,
            },
        ];

        let rowData = adminList.map(admin => {
            return (
                {
                    id: admin.id,
                    fullName: admin.fullName,
                    email: admin.email
                }
            )
        })

        return (
            <div className="card">
                <div className="card-header">Admin</div>
                <div className="card-body">
                    <div class="ml-1 mr-1 mb-2 d-flex">
                        <div>
                            <h5>Admin List</h5>
                        </div>
                        <div class="ml-auto">
                            <Link
                                to="/admin/adminlist/add"
                                className="btn btn-outline-success">
                                Add Admin
                            </Link>
                        </div>
                    </div>
                       {message &&
                       <div className={`mb-2 col-md-4 text-center alert alert-${msgStatus}`}>
                                {message}
                            </div>
                         } 
                    <div className="card">
                        {loading ? 'Loading' :
                            <DataTable
                                data={rowData}
                                columns={columns}
                                pagination={true}
                                fixedHeader={false}
                                noHeader={true}
                                sortable={true}
                                customStyles={customStyles}
                            />
                        }
                    </div>
                </div>
            </div>

        )
    }
}

export default AdminListBody;