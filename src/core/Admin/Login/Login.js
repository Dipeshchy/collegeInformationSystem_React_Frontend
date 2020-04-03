import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import '../../../assets/admin/main.css';

class Login extends React.Component {
    render() {
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
            <div class="limiter">
                <div class="container-login100">
                    <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    setSubmitting(false);
                                    // this.handleLogin(values);
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
                                    class="login100-form validate-form">
                                    <div>
                                        <h3 className="text-center pt-2 pb-2 text-info">
                                            Admin Login
                                    </h3>
                                    </div>
                                    <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                        <input
                                            class="input100"
                                            type="email"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            name="email"
                                            placeholder="Email" />
                                        <span class="focus-input100-1"></span>
                                        <span class="focus-input100-2"></span>

                                        {formik.touched.email && formik.errors.email ? (
                                  <span className="text-danger ml-3">{formik.errors.email}</span>
                                ) : null}

                                    </div>

                                    <div class="wrap-input100 rs1 validate-input" data-validate="Password is required">
                                        <input
                                            class="input100"
                                            type="password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            placeholder="Password" />
                                        <span class="focus-input100-1"></span>
                                        <span class="focus-input100-2"></span>

                                        {formik.touched.password &&  formik.errors.password ? (
                                  <span className="text-danger ml-3">
                                      {formik.errors.password}</span>
                                ) : null}
                                    </div>

                                    <div class="container-login100-form-btn m-t-20">
                                        <button
                                            type="submit"
                                            class="login100-form-btn">
                                            Sign in
						</button>
                                    </div>

                                    <div className="mt-3 ml-2 mr-2 text-center alert alert-danger">
                                        Login Failed
            </div>

                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;