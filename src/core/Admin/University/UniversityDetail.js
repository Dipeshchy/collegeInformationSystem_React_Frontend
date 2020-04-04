import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Modal from '../components/Modal';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';

class UniversityDetail extends React.Component {
    state = {
        loading: true,
        message: null,
        msgStatus: 'success',
        uniList: null,
        selectedId: null
    }

    componentDidMount() {
        const uniId = this.props.match.params.id
        if (uniId) {
            axios.get('http://localhost:8080/api/university/' + uniId)
                .then(res => {
                    if (res.status === 200) {
                        this.setState({
                            uni: res.data instanceof Object ? res.data : null,
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
        } else {
            this.setState({
                loading: false,
                message: 'Failed Loading',
                msgStatus: 'danger'
            })
        }
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
        const { uni, message, msgStatus, loading } = this.state;
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
                                        {/* <div>
                                            <h5>University Detail</h5>
                                        </div> */}
                                        <div className="ml-auto">
                                            <button
                                                onClick={this.props.history.goBack}
                                                className="btn btn-outline-secondary">
                                                Back
                            </button>
                                        </div>
                                    </div>
                                    {message &&
                                        <div className={`mb-2 col-md-4 text-center alert alert-${msgStatus}`}>
                                            {message}
                                        </div>
                                    }
                                    <div className="card-body">
                                        {loading ? 'Loading' :
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <h4>University Name : <strong className="text-success">{uni.name}</strong></h4>
                                                            <h4>Location : <strong>{uni.location}</strong></h4>
                                                            <h4>Phone : <strong>{uni.phone}</strong></h4>
                                                            <h4>Description : <p>{uni.description}</p></h4>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <h4>Established Date : <strong>{uni.estDate ? uni.estDate + ' A.D.' : null}</strong></h4>
                                                            <h4>Email : <strong>{uni.email}</strong></h4>
                                                            <h4>Website : <a href={uni.website} target="_blank">{uni.website}</a></h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

export default withRouter(UniversityDetail);