import React, { useEffect, useState } from "react";
import { login } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./partials/Header";

function Login() {
    const navigation = useNavigate(null);
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            return navigation('/');
        }
    }, [navigation]);

    const [errors, setErrors] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        const result = await login(form);
        setErrors(null);
        if (result.data.statusCode === 200) {
            if (result.data.statusCode === 200) {
                localStorage.setItem("user", JSON.stringify(result.data.data));
                navigation("/");
                return;
            }
            if (result.data.statusCode === 201) {
                toast(result.data.message);
                setErrors(result.data.data);
                return;
            }
            if (result.data.statusCode === 202) {
                toast(result.data.message);
                return;
            }
        }
    };

    return (<>
        <Header />
        <div className="container">
            <ToastContainer />
            <div className="row justify-content-center mt-3 pt-5">
                <div className="col-lg-5 card bg-dark mt-4">
                    <div className="card-body">
                        <h4 className="card-title text-light">Login Now</h4>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="form-label mt-4 text-secondary">
                                Email or Username
                            </label>
                            <input
                                type="text"
                                onChange={handleChange}
                                name='username'
                                className="form-control bg-dark shadow-none border border-1 border-secondary-subtle"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email or username" />
                            {errors?.username && (
                                <small id="usernameHelp" className="form-text text-muted">
                                    {errors.username.msg}
                                </small>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="form-label mt-4 text-secondary">
                                Password
                            </label>
                            <input
                                type="password"
                                onChange={handleChange}
                                name="password"
                                className="form-control bg-dark shadow-none border border-1 border-secondary-subtle"
                                id="exampleInputPassword"
                                aria-describedby="emailHelp"
                                placeholder="Enter Password"
                            />
                        </div>
                        <button type="button" onClick={handleSubmit} className="btn btn-primary mt-3 border border-0 shadow-none">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div >
    </>);
}
export default Login;