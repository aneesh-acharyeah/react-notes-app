import React, { useState, useEffect } from 'react'; // ✅ ADD useEffect
import './App.css';
import NoteForm from './components/NoteForm';

function App() {
  // ✅ Load notes from LocalStorage when app starts
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('my-notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [filterCategory, setFilterCategory] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [editNote, setEditNote] = useState(null);

  // ✅ Save to LocalStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('my-notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (note) => {
    if (editNote) {
      setNotes(notes.map(n => (n.id === note.id ? note : n)));
      setEditNote(null);
    } else {
      setNotes([{ ...note, id: Date.now() }, ...notes]);
    }
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEdit = (note) => {
    setEditNote(note);
  };

  const filteredNotes = notes.filter(note => {
    const categoryMatch = filterCategory === '' || note.category === filterCategory;
    const tagMatch = filterTag === '' || note.tags.includes(filterTag);
    return categoryMatch && tagMatch;
  });

  const uniqueTags = [...new Set(notes.flatMap(note => note.tags))];

  return (
    <div className="App">
      <h1>📝 Notes App</h1>

      <NoteForm onAddNote={handleAddNote} editNote={editNote} />

      {/* Filters */}
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

      {/* Notes List */}
      <div className="notes-list">
        {filteredNotes.length === 0 ? (
          <p className='msg' style={{ textAlign: 'center' }}> No notes found.</p>
        ) : (
          filteredNotes.map(note => (
            <div className="note-card" key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <p><strong>Category:</strong> {note.category}</p>
              <p><strong>Tags:</strong> {note.tags.join(', ')}</p>
              <div className="note-actions">
                <button onClick={() => handleEdit(note)}>✏️ Edit</button>
                <button onClick={() => handleDelete(note.id)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
