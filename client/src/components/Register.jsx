/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api.js';
import { ToastContainer, toast } from 'react-toastify';
import Header from './partials/Header.jsx';

function Register() {

    const [form, setForm] = useState({
        // name: "",
        username: "",
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const [errors, setErrors] = useState(null);

    const navigation = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            return navigation('/');
        }
    }, [navigation]);

    const handleSubmit = async (e) => {
        const result = await register(form);
        if (result.status === 200) {
            if (result.data.status === 201) {
                setErrors(result.data.data);
                toast(result.data.message);
                return;
            }

            if (result.status === 200) {
                localStorage.setItem('user', JSON.stringify(result.data));
                navigation('/')
                return;
            }

            if (result.status === 200) {

                toast(result.data.message);
                return;
            }

        }
        else {
            toast("something went wrong, please try again");
        }
    }

    return (<>
        <Header />
        <div className="container mt-3 pt-5">
            <ToastContainer />
            <div className="row justify-content-md-center mt-4">
                <div className="col-lg-5 card border-primary mb-3 bg-dark">
                    <div className="card-header h4 text-center mt-2 text-light">
                        Register An Account
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            {/* <label className="col-form-label text-secondary">
                                Name
                            </label>
                            <input type="text"
                                name='name'
                                // onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter Name"
                            />
                            {errors?.name && (
                                <small id="emailHelp" className="form-text text-danger">
                                    {errors.name.msg}
                                </small>
                            )} */}
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-secondary">
                                Username
                            </label>
                            <input type="text"
                                name='username'
                                onChange={handleInputChange}
                                className="form-control bg-dark shadow-none border border-1 border-secondary-subtle"
                                placeholder="Enter Username"
                            />
                            {errors?.username && (
                                <small id='emailHelp' className='form-text text-danger'>
                                    {errors.username.msg}
                                </small>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="col-form-label mt-4 text-secondary">
                                Email
                            </label>
                            <input type="text"
                                name='email'
                                onChange={handleInputChange}
                                className="form-control bg-dark shadow-none border border-1 border-secondary-subtle"
                                placeholder="Enter Email"
                            />
                            {errors?.email && (
                                <small id='emailHelp' className='form-text text-danger'>
                                    {errors.email.msg}
                                </small>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="col-form-label mt-4 text-secondary">
                                Password
                            </label>
                            <input type="Password"
                                name='password'
                                onChange={handleInputChange}
                                className="form-control bg-dark shadow-none border border-1 border-secondary-subtle"
                                placeholder="Enter Password"
                            />
                            {errors?.password && (
                                <small id='emailHelp' className='form-text text-danger'>
                                    {errors.password.msg}
                                </small>
                            )}
                        </div>
                        <button type="button"
                            onClick={handleSubmit}
                            className="btn btn-primary mt-3 border border-0 shadow-none">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
        </div >
    </>);
}

export default Register;