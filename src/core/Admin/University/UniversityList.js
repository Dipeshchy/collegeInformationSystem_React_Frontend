import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Modal from '../components/Modal';
import DataTable from 'react-data-table-component';
import customStyles from '../components/table/customStyles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class UniversityList extends React.Component {
    state = {
        loading: true,
        message: null,
        msgStatus: 'success',
        uniList: [],
        selectedId: null
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/university/list/status/1')
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        uniList: res.data instanceof Array ? res.data : [],
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

    // deleteAdmin = id => {
    //     if (id) {
    //         axios.delete(`http://localhost:8080/api/admin/${id}`)
    //             .then(res => {
    //                 if (res.data === 'success') {
    //                     let newAdminList = this.state.adminList.filter(admin => id !== admin.id)
    //                     $('#deleteAdminModal').modal('hide');
    //                     this.setState({
    //                         adminList: newAdminList,
    //                         selectedId: null,
    //                         message: 'Admin Deleted Successfully',
    //                         loading: false
    //                     }, () => {
    //                         setTimeout(() => this.setState({ message: null }), 3000)
    //                     })
    //                 } else {
    //                     $('#deleteAdminModal').modal('hide');
    //                     this.setState({
    //                         selectedId: null,
    //                         message: 'Admin Delete Failed',
    //                         msgStatus: 'danger',
    //                         loading: false
    //                     }, () => {
    //                         setTimeout(() => this.setState({ message: null }), 3000)
    //                     })
    //                 }
    //             }).catch(er => console.log(er))
    //     }
    // }

    render() {
        const { uniList, message, msgStatus, loading } = this.state;
        const columns = [
            {
                name: 'Id',
                selector: 'id',
                width: '50px',
                sortable: true
            },
            {
                name: 'University Name',
                selector: 'name',
                width: '200px',
                sortable: true
            },
            {
                name: 'Location',
                selector: 'location',
                width: '200px',
                sortable: true
            },
            {
                name: 'Est. Date',
                selector: 'estDate',
                width: '150px',
                sortable: true
            },
            {
                name: 'Email',
                selector: 'email',
                width: '180px',
                sortable: true
            },
            {
                name: 'Phone',
                selector: 'phone',
                width: '150px',
                sortable: true
            },
            {
                name: 'Website',
                selector: 'website',
                width: '180px',
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
                    <div>
                       <Link
                        to={{ pathname: `/admin/university/detail/${row.id}` }}
                        className='btn btn-sm btn-outline-info mr-2 '>
                        View
                    </Link>

                        <button
                            data-toggle="modal"
                            data-target="#deleteUniModal"
                            onClick={() => this.setState({ selectedId: row.id })}
                            className='btn btn-sm btn-outline-danger'>
                            Delete
                    </button>
                    </div>,
                right: true,
            },
        ];

        let rowData = uniList.map(uni => {
            return (
                {
                    id: uni.id,
                    name: uni.name,
                    location: uni.location,
                    estDate: uni.estDate + ' A.D.',
                    email: uni.email,
                    phone: uni.phone,
                    website: uni.website,
                }
            )
        })

        return (
            <React.Fragment>
                <Navbar />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar />
                        <div style={{ marginTop: '100px' }} className="col-md-10">
                            <div className="card">
                                <div className="card-header">University</div>
                                <div className="card-body">
                                    <div className="ml-1 mr-1 mb-2 d-flex">
                                        <div>
                                            <h5>University List</h5>
                                        </div>
                                        <div className="ml-auto">
                                            <Link
                                                to="/admin/adminlist/add"
                                                className="btn btn-outline-success">
                                                Add University
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
                                        id="deleteUniModal"
                                        role="dialog"
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true">
                                        <div
                                            className="modal-dialog"
                                            role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Delete University</h5>
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
                                                            // this.deleteAdmin(this.state.selectedId)
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
                        </div>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

export default UniversityList;