import React, { useState } from 'react';
import './todoformcss.css';

export default function TodoForm({ addTodo }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        addTodo(value);
        setValue("");
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input className='addtask' type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add a new task..." />
            <button type="submit">Add Task</button>
        </form>
    )
}
