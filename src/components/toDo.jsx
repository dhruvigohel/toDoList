
export default function ToDo({task, delTodo, toggleTask}) {
    return (
        <div>
            <h1>
            {task.id}. {task.task}
            </h1>
            <button onClick={() => delTodo(task.id)}>
                DeleteTask {task.id}
            </button>
            <button type="checkbox" onClick={()=>toggleTask(task.id)}>
                Completed?
            </button>
        </div>
    )
}