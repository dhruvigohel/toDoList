import React, { useState } from 'react';
import './todoformcss.css';

export default function TodoForm({ addTodo, theme }) {
    const [value, setValue] = useState("");
    let classname = 'form-container-' + theme;

    const handleSubmit = e => {
        e.preventDefault();
        addTodo(value);
        setValue("");
    }

    return (
        <form className={classname} onSubmit={handleSubmit}>
            <input className='addtask' type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add a new task..." required minLength="3" />
            <button type="submit">Add Task</button>
        </form>
    )
}
