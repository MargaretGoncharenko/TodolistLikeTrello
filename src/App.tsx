import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type tasksType = {
    id: string
    text: string
    checked: boolean
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
    return (
        <div className="Todolist">
            <Todolist title={"What to learn"}
                      tasks={tasks}
                      deleteTask={DeleteTask}
                      addNewTask={AddNewTask}
            />
        </div>
    )
}

export default App;
