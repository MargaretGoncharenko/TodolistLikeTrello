import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./TodoList";

export type tasksType = {
    id: string
    text: string
    checked: boolean
}
export type filterType = "all" | "active" | "completed"
type TodolistsProps = {
    id: string
    title: string
    filter: filterType
}

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), text: "HTML", checked: true},
        {id: v1(), text: "CSS", checked: true},
        {id: v1(), text: "JS/TS", checked: false},
        {id: v1(), text: "REACT/REDUX", checked: false},
    ])
    const DeleteTask = (id: string) => {
        const FilteredTasks = tasks.filter(t => t.id !== id)
        setTasks(FilteredTasks);
    }
    const AddNewTask = (text: string) => {
        const newTask = {id: v1(), text: text, checked: false}
        const AllTasks = [newTask, ...tasks]
        setTasks(AllTasks)
    }

    const ChangeTasksFilter = (value: filterType, todolistID: string) => {
        let todolist = Todolists.find(tl => tl.id == todolistID);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...Todolists])
        }
    }
    const changeTaskStatus = (taskID: string, changedStatus: boolean) => {
        let task = tasks.find(t => t.id == taskID);
        if (task) {
            task.checked = changedStatus
            setTasks([...tasks]);
        }
    }
    const [Todolists, setTodolists] = useState<Array<TodolistsProps>>([
        {id: v1(), title: "What to learn", filter: "active"},
        {id: v1(), title: "What to buy", filter: "completed"},
    ])
    return (
        <div className="Todolist">
            {
                Todolists.map(tl => {
                    let tasksForTodolist = tasks;
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks.filter(t => !t.checked);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks.filter(t => t.checked);
                    }
                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            deleteTask={DeleteTask}
                            addNewTask={AddNewTask}
                            changeTasksFilter={ChangeTasksFilter}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                        />
                    )
                })
            }
        </div>
    )
}

export default App;
