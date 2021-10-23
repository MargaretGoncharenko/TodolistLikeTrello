import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import t from "./Todolist.module.css";
import {tasksType} from "./App";

type TodolistProps = {
    title: string
    tasks: Array<tasksType>
    deleteTask: (id: string) => void
    addNewTask: (text: string) => void
}
export const Todolist = (props: TodolistProps) => {
    const [text, setText] = useState("")
    const onClickAddNewTaskHandler = () => {
        if (text) {
            props.addNewTask(text.trim())
            setText("")
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const onKeyPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13 && text) {
            onClickAddNewTaskHandler()
        }
    }
    return (
        <div>
            <div className={t.title}>{props.title}</div>
            <input value={text}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressEnterHandler}
            />
            <button onClick={onClickAddNewTaskHandler}>+</button>
            <ul>
                {
                    props.tasks.map(t => {
                        let onClickDeleteTaskHandler = () => props.deleteTask(t.id)
                        return (
                            <li key={t.id}>
                                <button onClick={onClickDeleteTaskHandler}>X</button>
                                <input type="checkbox" checked={t.checked}/>{t.text}
                            </li>)
                    })
                }
            </ul>
        </div>
    )
}