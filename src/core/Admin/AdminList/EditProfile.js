import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

class EditProfile extends React.Component {

    state = {
        message: null,
        msgStatus: 'success',
        loadingStatus: 0, // 0 = initial, 1 = submitting, 2 submitted
    }

    render() {
        const { message, msgStatus, loadingStatus } = this.state;
        let schema = {
            fullName: Yup.string()
                .required('This field is required')
                .matches(/(^((( )*[A-Za-z]*)+)+$)/, "Enter String only")
                .min(2, "Full name must contain more than 2 character")
                .max(100, "Max limit reached"),
            email: Yup.string()
                .required('This field is required')
                .email('Enter a valid email'),
            password: Yup.string()
                .required('This field is required')
                .min(8, 'Password must contain more than 8 characters')
                .max(10, 'Password must contain less than 10 characters'),
            password_confirm: Yup.string()
                .required('This field is required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .min(6, 'Password must contain more than 6 characters')
                .max(10, 'Password must contain less than 10 characters'),
        }

        let loginData = localStorage.getItem('loggedInData')
        let data = JSON.parse(loginData)
        const admin_id = data ? data.id : null;
        let initialValues = {
            fullName: data ? data.fullName : '',
            email: data ? data.email : '',
            password: data ? data.password : '',
            password_confirm: data ? data.password : '',

        }
        let validationSchema = Yup.object().shape(schema);
        return (
            <React.Fragment>
                <Navbar />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar />
                        <div style={{ marginTop: '100px' }} className="col-md-10">
                            <div className="card">
                                <div className="card-header"> Admin</div>
                                <div className="card-body">
                                    <div className="ml-1 mr-1 mb-2 d-flex">
                                        <div>
                                            <h5>Edit Admin</h5>
                                        </div>
                                        <div className="ml-auto">
                                            <button
                                                onClick={this.props.history.goBack}
                                                className="btn btn-outline-secondary">
                                                Back
                            </button>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <Formik
                                                enableReinitialize={true}
                                                initialValues={initialValues}
                                                validationSchema={validationSchema}
                                                onSubmit={(values, { resetForm, setSubmitting }) => {
                                                    setTimeout(() => {
                                                        setSubmitting(false);
                                                        this.setState({
                                                            loadingStatus: 1
                                                        }, () => {
                                                            let requestData = {
                                                                fullName: values.fullName,
                                                                email: values.email,
                                                                password: values.password
                                                            }
                                                            console.log(admin_id)
                                                            if (admin_id) {
                                                                axios.put('http://localhost:8080/api/admin/' + admin_id, requestData)
                                                                    .then(res => {
                                                                        if (res.status === 200) {
                                                                            console.log(res.data)
                                                                            resetForm();
                                                                            localStorage.setItem('loggedInData', JSON.stringify(res.data))
                                                                            this.setState({
                                                                                message: 'Profile updated Successfully',
                                                                                loadingStatus: 2
                                                                            }, () => {
                                                                                setTimeout(() => {
                                                                                    this.setState({
                                                                                        message: null,
                                                                                        loadingStatus: 0
                                                                                    })
                                                                                    this.props.history.push('/admin/adminlist/myprofile')
                                                                                }, 2000)
                                                                            })
                                                                        } else {
                                                                            this.setState({
                                                                                message: 'Profile update failed. Try again with new data',
                                                                                msgStatus: 'danger',
                                                                                loadingStatus: 2
                                                                            }, () => {
                                                                                setTimeout(() => {
                                                                                    this.setState({
                                                                                        message: null,
                                                                                        loadingStatus: 0
                                                                                    })
                                                                                }, 3000)
                                                                            })
                                                                        }
                                                                    })
                                                                    .catch(er => {
                                                                        console.log(er);
                                                                        this.setState({
                                                                            message: 'Profile update failed. Try again with new data',
                                                                            msgStatus: 'danger',
                                                                            loadingStatus: 2
                                                                        }, () => {
                                                                            setTimeout(() => {
                                                                                this.setState({
                                                                                    message: null,
                                                                                    loadingStatus: 0
                                                                                })
                                                                            }, 3000)
                                                                        })
                                                                    })
                                                            }
                                                        })
                                                    }, 500)
                                                }}
                                            >
                                                {formik => (
                                                    <form
                                                        onSubmit={
                                                            e => {
                                                                e.preventDefault();
                                                                formik.handleSubmit()
                                                            }
                                                        }
                                                        className="col-md-4">
                                                        <div className="form-group">
                                                            <label>Fullname *</label>
                                                            <input
                                                                type="text"
                                                                name="fullName"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.fullName}
                                                                className="form-control"
                                                                placeholder="Eg. Min Bist"
                                                            />
                                                            {formik.touched.fullName && formik.errors.fullName ? (
                                                                <span className="text-danger">{formik.errors.fullName}</span>
                                                            ) : null}
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Email *</label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.email}
                                                                className="form-control"
                                                                placeholder="Eg. min@gmail.com"
                                                            />
                                                            {formik.touched.email && formik.errors.email ? (
                                                                <span className="text-danger">{formik.errors.email}</span>
                                                            ) : null}
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Password *</label>
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.password}
                                                                className="form-control"
                                                            />
                                                            {formik.touched.password && formik.errors.password ? (
                                                                <span className="text-danger">{formik.errors.password}</span>
                                                            ) : null}
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Confirm Password *</label>
                                                            <input
                                                                type="password"
                                                                name="password_confirm"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.password_confirm}
                                                                className="form-control"
                                                            />
                                                            {formik.touched.password_confirm && formik.errors.password_confirm ? (
                                                                <span className="text-danger">{formik.errors.password_confirm}</span>
                                                            ) : null}
                                                        </div>

                                                        <div className="form-group">
                                                            <button
                                                                type="submit"
                                                                disabled={loadingStatus === 1}
                                                                className="btn btn-outline-success">
                                                                {loadingStatus === 1 ? 'Loading' : 'Update Profile'}
                                                            </button>
                                                        </div>
                                                    </form>
                                                )}
                                            </Formik>

                                            {message && loadingStatus === 2 &&
                                                <div className={`col-md-4 alert alert-${msgStatus}`}>{message}</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(EditProfile);

