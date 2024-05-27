import { getValue } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { useState, useEffect } from 'react';
import TodoForm from './todoform';
import ToDo from './toDo';
import EditTodoForm from './edit';
import './outercss.css';
import { object, string, number, date, InferType } from 'yup';


const taskSchema = object().shape({
    task: string().required('Task is required').min(3, 'Task must be at least 3 characters long'),
});

export default function Box() {
    const [toDos, setTodos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');

    // useEffect(() => {
    //     const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    //     setTodos(savedTodos);
    // }, []);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    async function addTodo(toDo) {
        try {
            await taskSchema.validate({ task: toDo });
            const newTodos = [...toDos, { id: Date.now(), task: toDo, completed: false, isEditing: false }];
            setTodos(newTodos);
            localStorage.setItem('todos', JSON.stringify(newTodos));
            setError('');
        } catch (err) {
            setError(err.message);
        }
    }

    async function delTodo(id) {
        const confirmed = await confirmDeletion();
        if (confirmed) {
            setTodos(toDos.filter(toDo => toDo.id !== id));
        }
    }

    function confirmDeletion() {
        return new Promise((resolve) => {
            const confirmed = window.confirm('Are you sure you want to delete this task?');
            resolve(confirmed);
        });
    }

    function toggleTask(id) {
        setTodos(toDos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
        localStorage.setItem('todos', JSON.stringify(toDos));
    }

    function editTodo(id) {
        setTodos(toDos.map(todo => todo.id === id ? {...todo, editing: !todo.editing} : todo));
    }

    const editTask = (task, id) => {
        setTodos(
          toDos.map((todo) =>
            todo.id === id ? { ...todo, task, editing: !todo.editing } : todo
          )
        );
        localStorage.setItem('todos', JSON.stringify(toDos));
      };

    const filteredTodos = toDos.filter(toDo => 
        toDo.task.toLowerCase().includes(searchQuery.toLowerCase())
    );

    
    return (
        <div>
            <div className='outeraddtask'>
                <TodoForm addTodo={addTodo} />
                {error && <div className="error">{error}</div>}
                <input 
                    type="text" 
                    placeholder="Search tasks..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                
            </div>
            <div className='outertasks'>
                {filteredTodos.map((toDo) => (
                    toDo.editing ? 
                        <EditTodoForm editTodo={editTask} task={toDo} key={toDo.id} /> : 
                        <ToDo delTodo={delTodo} toggleTask={toggleTask} task={toDo} editTodo={editTodo} key={toDo.id} />
                ))}
            </div>
        </div>
    )
}