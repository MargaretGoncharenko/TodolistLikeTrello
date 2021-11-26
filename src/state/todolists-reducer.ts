import {filterType, TodolistsProps} from "../App";
import {v1} from "uuid";

export type DeleteTodolistActionType = {
    type:'DELETE-TODOLIST',
    id:string
}
export type AddTodolistActionType = {
    type:'ADD-TODOLIST',
    title:string
}
export type ChangeTodolistTitleActionType = {
    type:'CHANGE-TODOLIST-TITLE',
    id:string
    title:string
}
export type ChangeTodolistFilterActionType = {
    type:'CHANGE-TODOLIST-FILTER',
    id:string
    filter:filterType
}
type ActionsType = DeleteTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType
export const todolistsReducer = (state: Array<TodolistsProps>, action: ActionsType): Array<TodolistsProps> => {
    switch (action.type) {
        case 'DELETE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id:v1(),
                title: action.title,
                filter: "all"
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(tl => tl.id == action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            let todolist = state.find(tl => tl.id == action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }
}
