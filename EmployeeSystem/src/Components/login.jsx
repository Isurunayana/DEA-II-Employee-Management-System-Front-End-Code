import React, { useState } from "react";
import './style.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Login = () => {
    const [values, setValues] = useState({ 
        email: '', 
        password: '' 
    });
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!checkboxChecked) {
            Swal.fire({
                icon: 'warning',
                title: 'Terms & Conditions',
                text: 'Please agree to the terms and conditions before logging in.',
                confirmButtonText: 'OK'
            });
            return;
        }

        axios.post('http://localhost:3000/auth/adminlogin', values, { withCredentials: true })
            .then(result => {
                if (result.data.loginStatus) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                        text: 'You are being redirected to the dashboard.',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        navigate('/dashboard');
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: result.data.Error || 'Invalid email or password.',
                        confirmButtonText: 'Try Again'
                    });
                }
            })
            .catch(err => {
                console.error('Login error:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'An error occurred while processing your request. Please try again later.',
                    confirmButtonText: 'OK'
                });
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className="p-3 rounded w-25 border loginForm">
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input
                            type="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Enter Email"
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className="form-control rounded-0"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className="form-control rounded-0"
                            required
                        />
                    </div>
                    <button className="btn btn-success w-100 rounded-0 mb-2">Log in</button>
                    <div className="mb-1">
                        <input
                            type="checkbox"
                            name="tick"
                            id="tick"
                            className="me-2"
                            onChange={(e) => setCheckboxChecked(e.target.checked)}
                        />
                        <label htmlFor="tick">You agree with Terms & Conditions</label>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
