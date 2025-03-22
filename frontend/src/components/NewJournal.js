import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NewJournal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [journalContent, setJournalContent] = useState('');
  const [savedPrompt, setSavedPrompt] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  // Load the journal prompt from location state or localStorage
  useEffect(() => {
    if (location.state && location.state.journalPrompt) {
      setSavedPrompt(location.state.journalPrompt);
      // Also save to localStorage as a backup
      localStorage.setItem('lastJournalPrompt', JSON.stringify(location.state.journalPrompt));
    } else {
      // Try to load from localStorage if not in location state
      const savedData = localStorage.getItem('lastJournalPrompt');
      if (savedData) {
        try {
          setSavedPrompt(JSON.parse(savedData));
        } catch (e) {
          console.error("Error parsing saved journal prompt", e);
        }
      } else {
        // No journal prompt found
        setSaveStatus('No journal prompt found. Please generate one first.');
      }
    }
  }, [location]);

  const handleContentChange = (e) => {
    setJournalContent(e.target.value);
    setSaveStatus('');
  };

  const saveJournal = () => {
    if (!journalContent.trim()) {
      setSaveStatus('Please write something before saving.');
      return;
    }

    // Save the journal entry with the full prompt object
    const journalEntry = {
      prompt: savedPrompt,
      content: journalContent,
      date: new Date().toISOString()
    };

    // Save to localStorage
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    savedEntries.push(journalEntry);
    localStorage.setItem('journalEntries', JSON.stringify(savedEntries));
    
    setSaveStatus('Journal saved successfully!');
    setJournalContent(''); // Clear the text area after saving
    
    // Optional: Navigate to the journal list after saving
    // setTimeout(() => navigate('/journals'), 1500);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 mb-4">
          <button 
            className="btn btn-outline-secondary" 
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-arrow-left me-2"></i>Back
          </button>
          <button 
            className="btn btn-outline-primary ms-2" 
            onClick={() => navigate('/journals')}
          >
            <i className="fas fa-book me-2"></i>View All Journals
          </button>
        </div>
      </div>

      {savedPrompt ? (
        <>
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4>{savedPrompt.title}</h4>
                  <span className="badge bg-primary">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="card-body">
                  <div className="mb-4">
                    <p className="lead">{savedPrompt.prompt}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h5>Follow-up Questions:</h5>
                    <ol className="ps-4">
                      {savedPrompt.follow_up_questions.map((question, index) => (
                        <li key={index} className="mb-2">{question}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="row text-muted mb-2">
                    <div className="col-md-6">
                      <small><strong>Intention:</strong> {savedPrompt.intention}</small>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <small><strong>Suggested Time:</strong> {savedPrompt.estimated_time}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card shadow-sm">
                <div className="card-header">
                  <h5>Your Journal Entry</h5>
                </div>
                <div className="card-body">
                  <textarea
                    className="form-control"
                    rows="12"
                    placeholder="Start writing your thoughts here..."
                    value={journalContent}
                    onChange={handleContentChange}
                  ></textarea>
                  
                  {saveStatus && (
                    <div className={`alert mt-3 ${saveStatus.includes('successfully') ? 'alert-success' : 'alert-warning'}`}>
                      {saveStatus}
                    </div>
                  )}
                  
                  <div className="d-flex justify-content-end mt-3">
                    <button 
                      className="btn btn-primary" 
                      onClick={saveJournal}
                    >
                      <i className="fas fa-save me-2"></i>Save Journal Entry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="alert alert-warning">
          {saveStatus || 'Loading journal prompt...'}
        </div>
      )}
    </div>
  );
};

export default NewJournal;