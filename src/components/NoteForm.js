import React, { useState, useEffect } from 'react';
import '../App.css';

function NoteForm({ onAddNote, editNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Work');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
      setCategory(editNote.category);
      setTags(editNote.tags.join(', '));
    } else {
      setTitle('');
      setContent('');
      setCategory('Work');
      setTags('');
    }
  }, [editNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      id: editNote ? editNote.id : Date.now(),
      title,
      content,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };
    onAddNote(newNote);
    setTitle('');
    setContent('');
    setCategory('Work');
    setTags('');
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Note Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
      </select>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <button type="submit">{editNote ? 'Update Note' : 'Add Note'}</button>
    </form>
  );
}

export default NoteForm;
