import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import "./Todolist.css";
import {filterType, tasksType} from "./App";
import {AddItemForm} from "./AddItemForm";

type TodolistProps = {
    id: string
    title: string
    tasks: Array<tasksType>
    deleteTask: (id: string, todolistID: string) => void
    addNewTask: (text: string, todolistID: string) => void
    changeTasksFilter: (value: filterType, todolistID: string) => void
    changeTaskStatus: (taskID: string, changedStatus: boolean, todolistID: string) => void
    filter: filterType
    deleteTodolist: (id: string) => void

}
export const Todolist = (props: TodolistProps) => {
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
    const addTask = (title: string) => {
        props.addNewTask(title, props.id);
    }
    return (
        <div className="Todolist">
            <div className="title">
                {props.title}
                <button onClick={onClickDeleteTodolist}>X</button>
            </div>
            <AddItemForm addItem={addTask}/>
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

