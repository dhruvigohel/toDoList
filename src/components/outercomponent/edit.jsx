import React, { useState } from 'react';
import './editcss.css';

export default function EditTodoForm({ editTodo, task, theme }) {
    const [value, setValue] = useState(task.task);

    const handleSubmit = e => {
        e.preventDefault();
        editTodo(value, task.id);
    }

    let newtheme = 'edit-form-' + theme;

    return (
        <form className={newtheme} onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Edit task..." />
            <button type="submit">Edit Task</button>
        </form>
    )
}