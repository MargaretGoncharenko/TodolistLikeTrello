import {filterType, tasksStateType, TodolistsProps} from "../App";
import {v1} from "uuid";

export type DeleteTaskActionType = {
    type:'DELETE-TASK',
    todolistId:string
    taskId:string
}
export type AddTaskActionType = {
    type:'ADD-TASK',
    text:string
    todolistId:string
}
export type ChangeTaskStatusActionType = {
    type:'CHANGE-TASK-STATUS',
    taskId:string
    todolistId:string
    checked:boolean
}
export type ChangeTaskTitleActionType = {
    type:'CHANGE-TASK-TITLE',
    taskId:string
    todolistId:string
    text:string
}
type ActionsType = DeleteTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
export const tasksReducer = (state: tasksStateType, action: ActionsType): tasksStateType => {
    switch (action.type) {
        case 'DELETE-TASK': {
            const stateCopy= {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks;
           return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy= {...state}
            const tasks = state[action.todolistId]
            const newTask= {id:v1(), text:action.text, checked:false}
            stateCopy[action.todolistId] = [newTask, ...tasks]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy= {...state}
            const tasks = state[action.todolistId]
            const task = tasks.find(t=> t.id === action.taskId)
            if (task) {
                task.checked = action.checked;
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE' : {
            const stateCopy= {...state}
            const tasks = state[action.todolistId]
            const task = tasks.find(t=> t.id === action.taskId)
            if (task) {
                task.text = action.text;
            }
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }
}
export const deleteTaskAC = (taskId:string, todolistId:string): DeleteTaskActionType => {
    return {type:'DELETE-TASK',taskId, todolistId}
}
export const addTaskAC = (text:string, todolistId:string): AddTaskActionType => {
    return {type:'ADD-TASK', text, todolistId}
}
export const changeTaskStatusAC = (taskId:string, checked:boolean, todolistId:string): ChangeTaskStatusActionType => {
    return {type:'CHANGE-TASK-STATUS', taskId, checked, todolistId}
}
export const changeTaskTitleAC = (taskId:string, text:string, todolistId:string): ChangeTaskTitleActionType => {
    return {type:'CHANGE-TASK-TITLE', taskId, text, todolistId }
}