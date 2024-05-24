import { getValue } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { useState } from 'react';
import TodoForm from './todoform';
import ToDo from '../toDo';


export default function Box() {
    const [toDos, setTodos] = useState([])

    function addTodo(toDo) {
        setTodos([...toDos, 
        {
            id: Date.now(),
            task:toDo,
            done: false,
            isDeleted: false
        }])
        console.log(toDos);
    }

    function delTodo(id) {
        setTodos(
            toDos.filter(toDo =>
                toDo.id !== id
            )
          );
        console.log(toDos);
    }

    function toggleTask(id) {
        setTodos(toDos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
    }

    
    return (
        <div>
            <TodoForm addTodo={addTodo}/>
            {toDos.map((toDo, index)=>(
                <ToDo delTodo={delTodo} toggleTask={toggleTask} task={toDo} key={index} />
            ))}
        </div>
    )
}