import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Client from './Client';
import LocalJournals from './LocalJournals';

const ClientJournal = () => {
  const navigate = useNavigate();
  const [journalPrompt, setJournalPrompt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mood, setMood] = useState('');
  const [focusArea, setFocusArea] = useState('');
  const [promptType, setPromptType] = useState('');

  // Predefined options for dropdowns
  const moodOptions = ['Happy', 'Anxious', 'Sad', 'Confused', 'Motivated', 'Tired', 'Reflective', 'Grateful'];
  const focusAreaOptions = ['Self-care', 'Relationships', 'Work/Career', 'Personal growth', 'Mental health', 'Emotions', 'Goals', 'Past experiences'];
  const promptTypeOptions = ['Reflection', 'Gratitude', 'Goal-setting', 'Problem-solving', 'Mindfulness', 'Creative expression', 'Self-discovery'];

  const getJournalPrompt = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api-journal-prompt/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood,
          focus_area: focusArea,
          prompt_type: promptType
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setJournalPrompt(result.message.journal_entry);
        // Save to localStorage as a backup
        localStorage.setItem('lastJournalPrompt', JSON.stringify(result.message.journal_entry));
      } else {
        throw new Error(result.message || 'Unknown error occurred');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching journal prompt:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartJournaling = () => {
    // Navigate to the NewJournal page and pass the journalPrompt as state
    navigate('/newJournal', { state: { journalPrompt } });
  };

  return (
    <div>
      <Client/>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="card shadow-sm">
              <div className="card-header">
                <h5 className="card-title mb-0">Journal Prompt Generator</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="moodSelect" className="form-label">How are you feeling today?</label>
                  <select 
                    id="moodSelect" 
                    className="form-select"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                  >
                    <option value="">Select mood (optional)</option>
                    {moodOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="focusSelect" className="form-label">What would you like to focus on?</label>
                  <select 
                    id="focusSelect" 
                    className="form-select"
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                  >
                    <option value="">Select focus area (optional)</option>
                    {focusAreaOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="typeSelect" className="form-label">What type of prompt?</label>
                  <select 
                    id="typeSelect" 
                    className="form-select"
                    value={promptType}
                    onChange={(e) => setPromptType(e.target.value)}
                  >
                    <option value="">Select prompt type (optional)</option>
                    {promptTypeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <button 
                  className="btn btn-primary w-100" 
                  onClick={getJournalPrompt}
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : 'Generate Journal Prompt'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-8">
            <div className="card shadow-sm h-100">
              <div className="card-header">
                <h5 className="card-title mb-0">Today's Journal Prompt</h5>
              </div>
              <div className="card-body">
                {isLoading && (
                  <div className="text-center py-5">
                    <div className="spinner-border" role="status"></div>
                    <p className="mt-3">Creating your journal prompt...</p>
                  </div>
                )}
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    Error: {error}
                  </div>
                )}
                
                {journalPrompt && (
                  <div className="journal-prompt">
                    <h3 className="text-center mb-4">{journalPrompt.title}</h3>
                    
                    <div className="card mb-4 bg-light">
                      <div className="card-body">
                        <p className="lead">{journalPrompt.prompt}</p>
                      </div>
                    </div>
                    
                    <h5 className="mt-4">Follow-up Questions:</h5>
                    <ol className="list-group list-group-numbered mb-4">
                      {journalPrompt.follow_up_questions.map((question, index) => (
                        <li key={index} className="list-group-item border-0">{question}</li>
                      ))}
                    </ol>
                    
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <div className="card bg-light mb-3">
                          <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Intention</h6>
                            <p className="card-text">{journalPrompt.intention}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card bg-light mb-3">
                          <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Suggested Time</h6>
                            <p className="card-text">{journalPrompt.estimated_time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-center mt-4">
                      <button 
                        className="btn btn-outline-primary mx-2"
                        onClick={handleStartJournaling}
                      >
                        <i className="fas fa-pen me-2"></i>Start Journaling
                      </button>
                    </div>
                  </div>
                )}
                
                {!isLoading && !error && !journalPrompt && (
                  <div className="text-center py-5 text-muted">
                    <i className="fas fa-book-open fa-3x mb-3"></i>
                    <p>Select your preferences and click "Generate Journal Prompt" to create a personalized journal prompt.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <LocalJournals />
      </div>
    </div>
  );
};

export default ClientJournal;