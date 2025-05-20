import React, { useState } from 'react'

const NoteForm = ({ onAddNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !content || !category) return;

        const newNote = {
            id: Date.now(),
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()),
            category
        }
        onAddNote(newNote);
        setTitle('');
        setContent('');
        setTags('');
        setCategory('');

    }
    return (
        <form  onSubmit={handleSubmit} className='note-form'>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='Write your note..'></textarea>
            <input value={tags} onChange={(e) => setTags(e.target.value)}
                type="text" placeholder='Tags (comma separated)' />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
            </select>
            <button type='submit'>Add Note</button>
        </form>
    )
}
export default NoteForm;
