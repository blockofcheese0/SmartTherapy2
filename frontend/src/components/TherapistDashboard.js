import React, { useState } from 'react';
import Therapist from './Therapist';

const TherapistDashboard = () => {
      const [data, setData] = useState(null);
    
      const handleClick = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api-endpoint/');
          
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          const result = await response.json();
          setData(result.message);

        } catch (err) {
          console.error('Error fetching data:', err);
        }
    
      };
    

  return (
    <div>
        <Therapist />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="card-header lead">Completed</div>
              <div className="card-body scrollable-card">
              <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>



              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-header lead">Incompleted</div>
              <div className="card-body scrollable-card">
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>

                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>


            
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header lead">Contact User</div>
              <div class="card-body">
        <form>
          <div class="mb-3">

            <div class="input-group">
              <input type="text" class="form-control" placeholder="Type your message here..." aria-label="Message"></input>
              <button class="btn btn-primary" type="submit">
                <i class="bi bi-send-fill"></i> Send
              </button>
            </div>
          </div>

          <div class="d-grid">
            <button type="button" class="btn btn-outline-secondary">
              <i class="bi bi-bell"></i> Send check-in notification
            </button>
          </div>
        </form>
      </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};  

export default TherapistDashboard;