import React, { useState } from 'react';
import './editcss.css';

export default function EditTodoForm({ editTodo, task }) {
    const [value, setValue] = useState(task.task);

    const handleSubmit = e => {
        e.preventDefault();
        editTodo(value, task.id);
    }

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Edit task..." />
            <button type="submit">Edit Task</button>
        </form>
    )
}