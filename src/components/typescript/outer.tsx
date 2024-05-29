import React from 'react';
import { Suspense } from 'react';
import { useState, useEffect, createContext, useDeferredValue } from 'react';
import TodoForm from './todoform';
import ToDo from './toDo';
import EditTodoForm from './edit';
import './outercss.css';
import { object, string, number, date, InferType } from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ThemeProvider = createContext(null);

const taskSchema = object().shape({
    task: string().required('Task is required').min(3, 'Task must be at least 3 characters long'),
});

export default function Box() {
    type themetype = 'dark' | 'light';
    const [toDos, setTodos] = useState<Array<object>>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [error, setError] = useState('');
    const [theme, setTheme] = useState<themetype>('light');
    const deferredquery = useDeferredValue(toDos);

    // useEffect(() => {
    //     const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    //     setTodos(savedTodos);
    // }, []);

    useEffect(() => {
        const Ltodo  =localStorage.getItem('todos');
        const savedTodos = Ltodo &&  (JSON.parse(Ltodo) || []);
        const Ltheme = localStorage.getItem('theme');
        const savedTheme = Ltheme && (JSON.parse(Ltheme) || 'light');
        setTodos(savedTodos);
        setTheme(savedTheme);
    }, []);

    async function addTodo(toDo: {id: number, task: string, completed: boolean, isEditing: boolean}) {
        try {
            //await taskSchema.validate({ task: toDo });
            const newTodos = [...toDos, { id: Date.now(), task: toDo, completed: false, isEditing: false }];
            setTodos(newTodos);
            localStorage.setItem('todos', JSON.stringify(newTodos));
            setError('');
        } catch (err) {
            setError(err.message);
        }
    }

    async function delTodo(id: number) {
        const confirmed = await confirmDeletion();
        if (confirmed) {
            const newTodos = toDos.filter(toDo => toDo.id !== id);
            localStorage.setItem('todos', JSON.stringify(newTodos));
            setTodos(newTodos);
        }
    }

    function confirmDeletion() {
        return new Promise((resolve) => {
            const confirmed = window.confirm('Are you sure you want to delete this task?');
            resolve(confirmed);
        });
    }

    function toggleTask(id: number) {
        setTodos(toDos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
        localStorage.setItem('todos', JSON.stringify(toDos));
    }

    function editTodo(id: number) {
        const newTodos = toDos.map(todo => todo.id === id ? {...todo, editing: !todo.editing} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const editTask = (task: object, id: number) => {
        const newTodos = toDos.map((todo) =>
        todo.id === id ? { ...todo, task, editing: !todo.editing } : todo
      )
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));

      };

    const filteredTodos = deferredquery.filter(toDo => 
        toDo.task.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let keyy = 1;

    
    return (
        <ThemeProvider.Provider value = {theme}>
            <div className={theme}>
            <div>
                <div className='title-todo'>
                    ToDo List
                </div>
                <TodoForm addTodo={addTodo} theme={theme} />
                {error && <div className="error">{error}</div>}
                <div className='search'>
                    <input 
                        class='fa-plus'
                        type="text" 
                        placeholder="Search tasks..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
            </div>
            <Suspense fallback={<h2> loading... </h2>}>
                <div className='outertasks'>
                    {filteredTodos.map((toDo) => (
                        toDo.editing ? 
                            <EditTodoForm editTodo={editTask} task={toDo} key={toDo.id} theme={theme}/> : 
                            <ToDo delTodo={delTodo} toggleTask={toggleTask} task={toDo} editTodo={editTodo} key={toDo.id} theme={theme} id={keyy++}/>
                    ))}
                </div>
            </Suspense>
            <label>
            <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={(e) => {
                const newTheme = e.target.checked ? 'dark' : 'light';
                localStorage.setItem('theme', JSON.stringify(newTheme));
                setTheme(newTheme);
            }}
            />
            Use dark mode
        </label>
        </div>
        </ThemeProvider.Provider>
    )
}