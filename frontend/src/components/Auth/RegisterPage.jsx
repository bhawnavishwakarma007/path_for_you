import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Landingpage from '../landing/Landingpage';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration successful');
    navigate('/login'); // Redirect to login page after successful registration
  };

  return (
    <div>
      {/* Render the Landingpage component */}
      <Landingpage />

      {/* Registration Form */}
      <div
        className="container position-absolute top-50 start-50 translate-middle"
        style={{ zIndex: 10, backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '50%' }}
      >
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="registerName" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="registerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="registerEmail" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="registerEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="registerPassword" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="registerPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="mt-3 text-center">Already have an account? <a href="/login">Login here</a></p>
      </div>

      {/* Dim Background Effect */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9,
        }}
      ></div>
    </div>
  );
};

export default RegisterPage;
