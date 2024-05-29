// todo.jsx
import React from 'react';
import './todo.css';
import { faTrashCan, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ToDo({ task, delTodo, toggleTask, editTodo, theme, id }) {

    let classname = `todo${task.done ? 'completed' : ''}` + theme;
    console.log(classname);
    return (
        <div className={classname}>
            <h1>
                {id}. {task.task}
            </h1>
            <button onClick={() => delTodo(task.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
            <button onClick={() => toggleTask(task.id)}><FontAwesomeIcon icon={faCheck} /></button>
            <button onClick={() => editTodo(task.id)}><FontAwesomeIcon icon={faEdit} /></button>
        </div>
    )
}
