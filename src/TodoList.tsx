import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import "./Todolist.css";
import {filterType, tasksType} from "./App";

type TodolistProps = {
    id: string
    title: string
    tasks: Array<tasksType>
    deleteTask: (id: string, todolistID: string) => void
    addNewTask: (text: string, todolistID: string) => void
    changeTasksFilter: (value: filterType, todolistID: string) => void
    changeTaskStatus: (taskID: string, changedStatus: boolean, todolistID: string) => void
    filter: filterType
    deleteTodolist:(id:string)=>void

}
export const Todolist = (props: TodolistProps) => {
    const [text, setText] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onClickAddNewTaskHandler = () => {
        if (text.trim() !== "") {
            props.addNewTask(text, props.id);
            setText("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            onClickAddNewTaskHandler();
        }
    }
    const onAllFilterClickHandler = () => {
        props.changeTasksFilter("all", props.id)
    }
    const onActiveFilterClickHandler = () => {
        props.changeTasksFilter("active", props.id)
    }
    const onCompletedFilterClickHandler = () => {
        props.changeTasksFilter("completed", props.id)
    }
    const onClickDeleteTodolist = () => {
        props.deleteTodolist(props.id)
    }
    return (
        <div className="Todolist">
            <div className="title">
                {props.title}
                <button onClick={onClickDeleteTodolist}>X</button>
            </div>
            <input value={text}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={onClickAddNewTaskHandler}>+</button>
            {error && <div className="errorMessage">{error}</div>}
            <ul>
                {
                    props.tasks.map(t => {
                        let onClickDeleteTaskHandler = () => props.deleteTask(t.id, props.id)
                        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let changedTaskStatus = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, changedTaskStatus, props.id);
                        }
                        return (
                            <li key={t.id} className={t.checked ? "isDone" : ""}>
                                <button onClick={onClickDeleteTaskHandler}>X</button>
                                <input type="checkbox" onChange={onChangeTaskStatusHandler}
                                       checked={t.checked}/>{t.text}
                            </li>)
                    })
                }
            </ul>
            <button className={props.filter === "all" ? "activeButton" : ""}
                    onClick={onAllFilterClickHandler}>all
            </button>
            <button className={props.filter === "active" ? "activeButton" : ""}
                    onClick={onActiveFilterClickHandler}>active
            </button>
            <button className={props.filter === "completed" ? "activeButton" : ""}
                    onClick={onCompletedFilterClickHandler}>completed
            </button>
        </div>
    )
}