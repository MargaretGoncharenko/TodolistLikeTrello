import React, {ChangeEvent} from "react";
import "./Todolist.css";
import {filterType, tasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';


type TodolistProps = {
    id: string
    title: string
    tasks: Array<tasksType>
    deleteTask: (id: string, todolistID: string) => void
    addNewTask: (text: string, todolistID: string) => void
    changeTasksFilter: (value: filterType, todolistID: string) => void
    changeTaskStatus: (taskID: string, changedStatus: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, newValue: string, todolistID: string) => void
    filter: filterType
    deleteTodolist: (id: string) => void
    changeTodolistTitle: (newTitle: string, todolistID: string) => void

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
    const onchangeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }
    return (
        <div className="Todolist">
            <div className="title">
                <EditableSpan text={props.title} onchange={onchangeTodolistTitle}/>
                <IconButton onClick={onClickDeleteTodolist}><Delete/></IconButton>
            </div>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => {
                        let onClickDeleteTaskHandler = () => props.deleteTask(t.id, props.id)
                        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let changedTaskStatus = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, changedTaskStatus, props.id);
                        }
                        const onChangeTaskTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return (
                            <div key={t.id} className={t.checked ? "isDone" : ""}>
                                <IconButton onClick={onClickDeleteTaskHandler}><Delete/></IconButton>
                                <Checkbox color="primary" onChange={onChangeTaskStatusHandler}
                                          checked={t.checked}/>
                                <EditableSpan text={t.text} onchange={onChangeTaskTitleHandler}/>
                            </div>)
                    })
                }
            </div>
            <Button
                style={{
                    color: "blueviolet",
                    height: "25px",
                    margin: "10px 5px",
                }}
                variant={props.filter === "all" ? "outlined" : "text"}
                onClick={onAllFilterClickHandler}
            >
                all
            </Button>
            <Button
                style={{
                    color: "green",
                    height: "25px",
                    margin: "10px 5px",
                }}
                variant={props.filter === "active" ? "outlined" : "text"}
                onClick={onActiveFilterClickHandler}
            >
                active
            </Button>
            <Button
                style={{

                    color: "orange",
                    height: "25px",
                    margin: "10px 5px",
                }}
                variant={props.filter === "completed" ? "outlined" : "text"}
                onClick={onCompletedFilterClickHandler}
            >
                completed
            </Button>
        </div>
    )
}
