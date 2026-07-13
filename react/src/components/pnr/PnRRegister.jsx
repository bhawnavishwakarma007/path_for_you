import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/pnr/api';
import { Link } from 'react-router-dom';
import '../../css/pnr/PnRRegister.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [userType, setUserType] = useState('Technical');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ name, email, password, contact, user_type: userType });

            alert('Registration successful! Redirecting to login page...');
            navigate('/modulei/p&rlogin');  
        } catch (err) {
            // ✅ Custom error message for duplicate email
            if (err.response && err.response.status === 400) {
                setError("This email is already registered. Please login.");
            } else {
                setError(err.message || "Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Create an Account</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <input
                    type="text"
                    placeholder="Contact Number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                />
                <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                >
                    <option value="Technical">Technical</option>
                    <option value="Non-Technical">Non-Technical</option>
                </select>
                <button type="submit">Register</button>
            </form>
            
            <p>
                Already have an account? <Link to="/modulei/p&rlogin">Login</Link>
            </p>
        </div>
    );
};

export default Register;
