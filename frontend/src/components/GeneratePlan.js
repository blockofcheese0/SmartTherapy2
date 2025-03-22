import React, { useState } from 'react';
import Client from './Client';

const GeneratePlan = () => {
  const [therapyPlan, setTherapyPlan] = useState(null);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api-endpoint/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setTherapyPlan(result.message.therapy_plan);
      } else {
        throw new Error(result.message || 'Unknown error occurred');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Client />
      <div className="container mt-5">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-header ">
                <h5 className="card-title mb-0">Your Goals</h5>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="goalsInput"></label>
                  <textarea
                    id="goalsInput"
                    className="form-control mb-3"
                    rows="8"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your goals here..."
                  ></textarea>
                </div>
                <button 
                  className="btn btn-primary w-100" 
                  onClick={handleSubmit}
                  disabled={isLoading || !inputText.trim()}
                >
                  {isLoading ? 'Generating Plan...' : 'Generate Plan'}
                </button>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card">
              <div className="card-header ">
                <h5 className="card-title mb-0">Your Personalized Plan</h5>
              </div>
              <div className="card-body">
                {isLoading && <div className="text-center py-5"><div className="spinner-border" role="status"></div><p className="mt-3">Creating your personalized plan...</p></div>}
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    Error: {error}
                  </div>
                )}
                
                {therapyPlan && (
                  <div className="therapy-plan">
                    <h4 className="border-bottom pb-2">Summary</h4>
                    <p>{therapyPlan.summary}</p>
                    
                    <h4 className="mt-4 border-bottom pb-2">Goals</h4>
                    {therapyPlan.goals.map((goal, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-header">
                          <h5 className="mb-0">{goal.goal}</h5>
                        </div>
                        <div className="card-body">
                          <h6>Objectives:</h6>
                          <ul>
                            {goal.objectives.map((objective, idx) => (
                              <li key={idx}>{objective}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                    
                    <h4 className="mt-4 border-bottom pb-2">Recommended Interventions</h4>
                    {therapyPlan.interventions.map((intervention, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-header">
                          <h5 className="mb-0">{intervention.name}</h5>
                          <div className="text-muted"><small>Frequency: {intervention.frequency}</small></div>
                        </div>
                        <div className="card-body">
                          <p>{intervention.description}</p>
                          {intervention.resources.length > 0 && (
                            <>
                              <h6>Resources:</h6>
                              <ul>
                                {intervention.resources.map((resource, idx) => (
                                  <li key={idx}>{resource}</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <h4 className="mt-4 border-bottom pb-2">Timeline</h4>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="card mb-3 h-100">
                          <div className="card-header bg-light">
                            <h5 className="mb-0">Short-term (1-2 weeks)</h5>
                          </div>
                          <div className="card-body">
                            <p>{therapyPlan.timeline.short_term}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card mb-3 h-100">
                          <div className="card-header bg-light">
                            <h5 className="mb-0">Medium-term (1 month)</h5>
                          </div>
                          <div className="card-body">
                            <p>{therapyPlan.timeline.medium_term}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card mb-3 h-100">
                          <div className="card-header bg-light">
                            <h5 className="mb-0">Long-term (3 months)</h5>
                          </div>
                          <div className="card-body">
                            <p>{therapyPlan.timeline.long_term}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="mt-4 border-bottom pb-2">Progress Metrics</h4>
                    <ul className="list-group">
                      {therapyPlan.progress_metrics.map((metric, index) => (
                        <li key={index} className="list-group-item">{metric}</li>
                      ))}
                    </ul>
                    
                    <div className="mt-4 text-center">
                    </div>
                  </div>
                )}
                
                {!isLoading && !error && !therapyPlan && (
                  <div className="text-center py-5 text-muted">
                    <i className="fas fa-clipboard-list fa-3x mb-3"></i>
                    <p>Enter your goals on the left and click "Generate Therapy Plan" to create your personalized therapy plan.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePlan;