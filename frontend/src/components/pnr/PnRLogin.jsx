import React, { useState } from 'react';
import { loginUser } from '../../services/pnr/api';
import { Link, useNavigate } from 'react-router-dom'; // ✅ useNavigate import karein

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // ✅ useNavigate ka instance

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });

            // ✅ Token & User Type Store in Local Storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('userType', response.user.user_type);

            setSuccess("Login successful!");
            setError("");

            // ✅ 2-second delay ke baad redirect karein
            setTimeout(() => {
                navigate('/modulei/p&rhome'); // ✅ Login ke baad redirect karein
            }, 800);

        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError("Your email or password is incorrect, please check and try again.");
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }

            setSuccess("");
            setTimeout(() => setError(""), 3000);
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>

            <p>
                Don't have an account? <Link to="/modulei/p&rregister">Register</Link>
            </p>
        </div>
    );
};

export default Login;
