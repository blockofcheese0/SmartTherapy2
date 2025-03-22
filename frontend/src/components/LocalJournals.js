import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LocalJournals = () => {
  const navigate = useNavigate();
  const [journalEntries, setJournalEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState('');

  // Load all journal entries from localStorage
  useEffect(() => {
    const loadJournalEntries = () => {
      try {
        const savedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        // Sort entries by date (newest first)
        savedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
        setJournalEntries(savedEntries);
      } catch (e) {
        console.error("Error loading journal entries:", e);
        setJournalEntries([]);
      }
    };

    loadJournalEntries();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
  };

  const deleteEntry = (indexToDelete) => {
    if (window.confirm('Are you sure you want to delete this journal entry? This action cannot be undone.')) {
      const updatedEntries = journalEntries.filter((_, index) => index !== indexToDelete);
      setJournalEntries(updatedEntries);
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      
      if (selectedEntry && indexToDelete === journalEntries.indexOf(selectedEntry)) {
        setSelectedEntry(null);
      }
      
      setDeleteStatus('Journal entry deleted successfully!');
      setTimeout(() => setDeleteStatus(''), 3000);
    }
  };

  const createNewJournal = () => {
    // Navigate to the prompt generator or directly to new journal with last prompt
    const lastPrompt = localStorage.getItem('lastJournalPrompt');
    if (lastPrompt) {
      navigate('/new-journal', { state: { journalPrompt: JSON.parse(lastPrompt) } });
    } else {
      navigate('/generate-prompt');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 mb-4">


        </div>
      </div>

      {deleteStatus && (
        <div className="alert alert-success mb-3">
          {deleteStatus}
        </div>
      )}

      {journalEntries.length === 0 ? (
        <div className="alert alert-info">
          <p>You haven't created any journal entries yet. Click the "New Journal Entry" button to get started!</p>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-header">
                <h5>Your Journal Entries ({journalEntries.length})</h5>
              </div>
              <div className="list-group list-group-flush" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {journalEntries.map((entry, index) => (
                  <button 
                    key={index}
                    className={`list-group-item list-group-item-action ${selectedEntry === entry ? 'active' : ''}`}
                    onClick={() => handleEntryClick(entry)}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">{entry.prompt.title}</h6>
                      <small>{formatDate(entry.date).split(',')[0]}</small>
                    </div>
                    <p className="mb-1 text-truncate">{entry.content.substring(0, 60)}...</p>
                    <small>{formatDate(entry.date)}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-8">
            {selectedEntry ? (
              <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4>{selectedEntry.prompt.title}</h4>
                  <div>
                    <span className="badge bg-primary me-2">{formatDate(selectedEntry.date)}</span>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => deleteEntry(journalEntries.indexOf(selectedEntry))}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="mb-4">
                    <h6>Prompt:</h6>
                    <p>{selectedEntry.prompt.prompt}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h6>Your Response:</h6>
                    <div className="p-3 bg-light rounded">
                      {selectedEntry.content.split('\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h6>Follow-up Questions:</h6>
                    <ol className="ps-4">
                      {selectedEntry.prompt.follow_up_questions.map((question, index) => (
                        <li key={index} className="mb-2">{question}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="row text-muted">
                    <div className="col">
                      <small><strong>Intention:</strong> {selectedEntry.prompt.intention}</small>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card shadow-sm">
                <div className="card-body text-center p-5">
                  <i className="fas fa-book fa-3x text-muted mb-3"></i>
                  <h5>Select a journal entry to view its contents</h5>
                  <p className="text-muted">Click on any entry from the list on the left to see your journal entry and the prompt.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalJournals;