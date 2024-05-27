// todo.jsx
import React from 'react';
import './todo.css';

export default function ToDo({ task, delTodo, toggleTask, editTodo }) {
    return (
        <div className={`todo ${task.done ? 'completed' : ''}`}>
            <h1>
                {task.id}. {task.task}
            </h1>
            <button onClick={() => delTodo(task.id)}>Delete Task</button>
            <button onClick={() => toggleTask(task.id)}>Completed?</button>
            <button onClick={() => editTodo(task.id)}>Edit Task</button>
        </div>
    )
}
