import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center p-4 p-md-5 bg-white rounded shadow-sm w-100" style={{ maxWidth: '400px' }}>
        <h1 className="h3 mb-4 text-primary">Log in</h1>

        <div className="d-flex flex-column">
          {/* Client Button, we should change the link to parts */}
          <Link
            to="/form"
            className="btn btn-primary btn-lg mb-3 py-3"
          >
            I am a client
          </Link>

          {/* Therapist Button, we should change the link to parts */}
          <Link
            to="/therapistWelcome"
            className="btn btn-outline-primary btn-lg py-3"
          >
            I am a therapist
          </Link>



          
        </div>
      </div>
    </div>
  );
}

export default Login;