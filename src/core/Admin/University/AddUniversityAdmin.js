import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

class AddUniversityAdmin extends React.Component {

    state = {
        message: null,
        msgStatus: 'success',
        loadingStatus: 0, // 0 = initial, 1 = submitting, 2 submitted
    }
    render() {
        const { message, msgStatus, loadingStatus } = this.state;
        let schema = {
            name: Yup.string()
                .required('This field is required')
                .matches(/(^((( )*[A-Za-z]*)+)+$)/, "Enter String only")
                .min(2, "Full name must contain more than 2 character")
                .max(100, "Max limit reached"),
            email: Yup.string()
                .required('This field is required')
                .email('Enter a valid email'),
            location: Yup.string()
                .required('This field is required')
                .min(2, "Full name must contain more than 2 character")
                .max(100, "Max limit reached"),
            estDate: Yup.string()
                // .matches(/^[0-9 ]{4}$/i, "Invalid Search Term")
                .required('This field is required')
                .length(4, 'Enter valid data in AD'),
            // .min(4, 'Enter valid date in AD')
            // .max(4, 'Enter valid date in AD'),
            phone: Yup.string()
                .required('This field is required')
                .min(7, 'More than 7 numbers.')
                .max(13, 'Less than 13 numbers is required.'),
            website: Yup.string()
                .required('This field is required')
                .url('Enter valid url with starting http//'),
            description: Yup.string()
                .required('This field is required')
        }
        let initialValues = {
            name: '',
            email: '',
            location: '',
            estDate: '',
            phone: '',
            status: 0,
            website: '',
            description: ''
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
                                <div className="card-header"> University</div>
                                <div className="card-body">
                                    <div className="ml-1 mr-1 mb-2 d-flex">
                                        <div>
                                            <h5>Add University</h5>
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
                                                initialValues={initialValues}
                                                validationSchema={validationSchema}
                                                onSubmit={(values, { resetForm, setSubmitting }) => {
                                                    setTimeout(() => {
                                                        setSubmitting(false);
                                                        this.setState({
                                                            loadingStatus: 1
                                                        }, () => {
                                                            let requestData = {
                                                                ...values
                                                            }
                                                            axios.post('http://localhost:8080/api/university', requestData)
                                                                .then(res => {
                                                                    if (res.data === 'success') {
                                                                        resetForm();
                                                                        this.setState({
                                                                            message: 'University Added Successfully',
                                                                            msgStatus: 'success',
                                                                            loadingStatus: 2
                                                                        }, () => {
                                                                            setTimeout(() => {
                                                                                this.setState({
                                                                                    message: null,
                                                                                    loadingStatus: 0
                                                                                })
                                                                                this.props.history.push('/admin/university')
                                                                            }, 3000)
                                                                        })
                                                                    } else {
                                                                        this.setState({
                                                                            message: 'University Add failed. Try again with new values',
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
                                                                        message: 'University Add failed. Try again with new values',
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
                                                            <label>Name *</label>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.name}
                                                                className="form-control"
                                                                placeholder="Eg. Pokhara University"
                                                            />
                                                            {formik.touched.name && formik.errors.name ? (
                                                                <span className="text-danger">{formik.errors.name}</span>
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
                                                                placeholder="Eg. info@pu.edu.com"
                                                            />
                                                            {formik.touched.email && formik.errors.email ? (
                                                                <span className="text-danger">{formik.errors.email}</span>
                                                            ) : null}
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Phone *</label>
                                                            <input
                                                                type="number"
                                                                name="phone"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.phone}
                                                                className="form-control"
                                                                placeholder="Eg. 073455555"
                                                            />
                                                            {formik.touched.phone && formik.errors.phone ? (
                                                                <span className="text-danger">{formik.errors.phone}</span>
                                                            ) : null}
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Location *</label>
                                                            <input
                                                                type="text"
                                                                name="location"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.location}
                                                                className="form-control"
                                                                placeholder="Eg. Dhungepatan, Pokhara"
                                                            />
                                                            {formik.touched.location && formik.errors.location ? (
                                                                <span className="text-danger">{formik.errors.location}</span>
                                                            ) : null}
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Established Date(in AD) *</label>
                                                            <input
                                                                type="number"
                                                                name="estDate"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.estDate}
                                                                className="form-control"
                                                                placeholder="Eg. 1994"
                                                            />
                                                            {formik.touched.estDate && formik.errors.estDate ? (
                                                                <span className="text-danger">{formik.errors.estDate}</span>
                                                            ) : null}
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Website *</label>
                                                            <input
                                                                type="string"
                                                                name="website"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.website}
                                                                className="form-control"
                                                                placeholder="Eg. http://www.pu.edu.np"
                                                            />
                                                            {formik.touched.website && formik.errors.website ? (
                                                                <span className="text-danger">{formik.errors.website}</span>
                                                            ) : null}
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Description *</label>
                                                            <textarea
                                                                name="description"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.description}
                                                                className="form-control"
                                                                placeholder="Eg. Pokhara university is one of the prominent 
                                                                university in Nepal.
                                                            "
                                                                rows="5"
                                                            >

                                                            </textarea>
                                                            {/* <input
                                                                type="string"
                                                                name="website"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.website}
                                                                className="form-control"
                                                                placeholder="Eg. http://www.pu.edu.np"
                                                            /> */}
                                                            {formik.touched.description && formik.errors.description ? (
                                                                <span className="text-danger">{formik.errors.description}</span>
                                                            ) : null}
                                                        </div>

                                                        <div className="form-group">
                                                            <button
                                                                type="submit"
                                                                // disabled={loadingStatus === 1}
                                                                className="btn btn-outline-success">
                                                                {loadingStatus === 1 ? 'Loading' : 'Add University'}
                                                            </button>
                                                        </div>
                                                    </form>
                                                )}
                                            </Formik>

                                            {message &&
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

export default withRouter(AddUniversityAdmin);

