import React from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import customStyles from '../components/table/customStyles';
import axios from 'axios';
import Modal from '../components/Modal';
import $ from 'jquery';

class AdminListBody extends React.Component {
    state = {
        loading: true,
        message: null,
        msgStatus: 'success',
        adminList: [],
        selectedId: null
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/admin')
            .then(res => {
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

    deleteAdmin = id => {
        if (id) {
            axios.delete(`http://localhost:8080/api/admin/${id}`)
                .then(res => {
                    if (res.data === 'success') {
                        let newAdminList = this.state.adminList.filter(admin => id !== admin.id)
                        $('#deleteAdminModal').modal('hide');
                        this.setState({
                            adminList: newAdminList,
                            selectedId: null,
                            message: 'Admin Deleted Successfully',
                            loading: false
                        }, () => {
                            setTimeout(() => this.setState({ message: null }), 3000)
                        })
                    } else {
                        $('#deleteAdminModal').modal('hide');
                        this.setState({
                            selectedId: null,
                            message: 'Admin Delete Failed',
                            msgStatus: 'danger',
                            loading: false
                        }, () => {
                            setTimeout(() => this.setState({ message: null }), 3000)
                        })
                    }
                }).catch(er => console.log(er))
        }
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
            // {
            //     name: 'Edit',
            //     cell: row =>
            //         <Link
            //             to={{ pathname: `/admin/adminlist/edit/${row.id}` }}
            //             className='btn btn-sm btn-outline-primary'>
            //             Edit
            //         </Link>,
            //     right: true,
            // },
            {
                name: 'Action',
                cell: row =>
                    <React.Fragment>
                        {row.id !== JSON.parse(localStorage.getItem('loggedInData')).id &&
                            <button
                                data-toggle="modal"
                                data-target="#deleteAdminModal"
                                onClick={() => this.setState({ selectedId: row.id })}
                                className='btn btn-sm btn-outline-danger'>
                                Delete
                    </button>
                        }
                    </React.Fragment>
                ,
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
                    <div className="ml-1 mr-1 mb-2 d-flex">
                        <div>
                            <h5>Admin List</h5>
                        </div>
                        <div className="ml-auto">
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
                    <div className="card-body">
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

                {/* Delete modal */}
                <Modal>
                    <div
                        className="modal fade"
                        id="deleteAdminModal"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div
                            className="modal-dialog"
                            role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Delete Admin</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">X</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete?</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            this.deleteAdmin(this.state.selectedId)
                                        }}
                                        className="btn btn-outline-danger">
                                        Delete
                                    </button>
                                    <button type="button"
                                        className="btn btn-outline-secondary"
                                        data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                {/* delete modal end */}

            </div>

        )
    }
}

export default AdminListBody;