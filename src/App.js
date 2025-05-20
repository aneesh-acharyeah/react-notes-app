import React, { useState } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterTag, setFilterTag] = useState('');

  const handleAddNote = (note) => {
    setNotes([note, ...notes]);
  }
  const filteredNotes = notes.filter(note => {
    const categoryMatch = filterCategory === '' || note.category === filterCategory;
    const tagMatch = filterTag === '' || note.tags.includes(filterTag);
    return categoryMatch && tagMatch;
  });

  const uniqueTags = [...new Set(notes.flatMap(note => note.tags))];
  return (
    <div className="App">
      <h1>📝 Notes App</h1>
      <NoteForm onAddNote={handleAddNote} />


      <div className="filters">
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>

        <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)}>
          <option value="">All Tags</option>
          {uniqueTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No notes yet</p>

        ) : (
          notes.map(note => (
            <div className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <p><strong>Category:</strong> {note.category} </p>
              <p><strong>Tags:</strong> {note.tags.join(', ')}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
