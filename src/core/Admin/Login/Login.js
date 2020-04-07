import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import '../../../assets/admin/main.css';
import { withRouter } from 'react-router';
import { adminLogin } from '../../../store/actions/admin/loginAction';

class Login extends React.Component {

    state = {
        loading_status: 0, // 0 = initial, 1 = loading, 2 = submitted,
        message: null
    }
    render() {

        const { loading_status, message } = this.state;
        const { adminLogin } = this.props;
        let schema = {
            email: Yup.string()
                .required('This field is required')
                .email('Enter a valid email'),
            password: Yup.string()
                .required('This field is required')
                .min(6, 'Password must contain minimum 6 characters')
                .max(10, 'Password must contain maximum 10 characters')
        }
        let validationSchema = Yup.object().shape(schema);

        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    setSubmitting(false);
                                    let requestData = {
                                        email: values.email,
                                        password: values.password
                                    }
                                    this.setState({
                                        loading_status: 1
                                    }, () => {
                                        adminLogin(requestData)
                                            .then(res => {
                                                if (res.data) {
                                                    localStorage.setItem('loggedInData', JSON.stringify(res.data))
                                                    this.setState({
                                                        message: 'Login Successful',
                                                        loading_status: 2
                                                    }, () => {
                                                        setTimeout(() => {
                                                            this.setState({
                                                                message: null
                                                            })
                                                            this.props.history.push('admin/dashboard')
                                                        }, 1000)
                                                    })

                                                } else {
                                                    this.setState({
                                                        message: 'Login Failed',
                                                        loading_status: 3
                                                    }, () => {
                                                        setTimeout(() => {
                                                            this.setState({
                                                                message: null
                                                            })
                                                        }, 3000)
                                                    })
                                                }
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
                                    className="login100-form validate-form">
                                    <div>
                                        <h3 className="text-center pt-2 pb-2 text-info">
                                            Admin Login
                                    </h3>
                                    </div>
                                    <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                        <input
                                            className="input100"
                                            type="email"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            name="email"
                                            placeholder="Email" />
                                        <span className="focus-input100-1"></span>
                                        <span className="focus-input100-2"></span>

                                        {formik.touched.email && formik.errors.email ? (
                                            <span className="text-danger ml-3">{formik.errors.email}</span>
                                        ) : null}

                                    </div>

                                    <div className="wrap-input100 rs1 validate-input" data-validate="Password is required">
                                        <input
                                            className="input100"
                                            type="password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            placeholder="Password" />
                                        <span className="focus-input100-1"></span>
                                        <span className="focus-input100-2"></span>

                                        {formik.touched.password && formik.errors.password ? (
                                            <span className="text-danger ml-3">
                                                {formik.errors.password}</span>
                                        ) : null}
                                    </div>

                                    <div className="container-login100-form-btn m-t-20">
                                        <button
                                            type="submit"
                                            className="login100-form-btn">
                                            Sign in
						</button>
                                    </div>

                                    {message &&
                                        loading_status === 3 &&
                                        <div className={`mt-3 ml-2 mr-2 text-center alert alert-danger`}>
                                            {message}
                                        </div>
                                    }

                                    {message &&
                                        loading_status === 2 &&
                                        <div className={`mt-3 ml-2 mr-2 text-center alert alert-success`}>
                                            {message}
                                        </div>

                                    }

                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loginData: state.loginReducerData
    }
}

const mapDispatchToProps = {
    adminLogin: adminLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));