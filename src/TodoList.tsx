import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import "./Todolist.css";
import {filterType, tasksType} from "./App";

type TodolistProps = {
    title: string
    tasks: Array<tasksType>
    deleteTask: (id: string) => void
    addNewTask: (text: string) => void
    changeTasksFilter: (value: filterType) => void
    changeTaskStatus: (taskID: string, changedStatus: boolean) => void
    filter: filterType

}
export const Todolist = (props: TodolistProps) => {
    const [text, setText] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onClickAddNewTaskHandler = () => {
        if (text.trim() !== "") {
            props.addNewTask(text);
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
        props.changeTasksFilter("all")
    }
    const onActiveFilterClickHandler = () => {
        props.changeTasksFilter("active")
    }
    const onCompletedFilterClickHandler = () => {
        props.changeTasksFilter("completed")
    }
    return (
        <div>
            <div className="title">{props.title}</div>
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
                        let onClickDeleteTaskHandler = () => props.deleteTask(t.id)
                        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let changedTaskStatus = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, changedTaskStatus);
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