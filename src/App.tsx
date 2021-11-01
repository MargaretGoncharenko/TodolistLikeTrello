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
    let tasksForTodolist = tasks;
    const [filter, setFilter] = useState<filterType>("all")
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.checked);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.checked);
    }
    const ChangeTasksFilter = (value: filterType) => {
        setFilter(value);
    }
    const changeTaskStatus = (taskID: string, changedStatus: boolean) => {
        let task = tasks.find(t => t.id == taskID);
        if (task) {
            task.checked = changedStatus
            setTasks([...tasks]);
        }
    }

    return (
        <div className="Todolist">
            <Todolist title={"What to learn"}
                      tasks={tasksForTodolist}
                      deleteTask={DeleteTask}
                      addNewTask={AddNewTask}
                      changeTasksFilter={ChangeTasksFilter}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    )
}

export default App;
