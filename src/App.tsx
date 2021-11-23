import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type tasksType = {
    id: string
    text: string
    checked: boolean
}
export type filterType = "all" | "active" | "completed"
export type TodolistsProps = {
    id: string
    title: string
    filter: filterType
}

function App() {
    const DeleteTask = (id: string, todolistID: string) => {
        let tasks = tasksObj[todolistID];
        const FilteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistID] = FilteredTasks;
        setTasks({...tasksObj});
    }
    const AddNewTask = (text: string, todolistID: string) => {
        let tasks = tasksObj[todolistID];
        const newTask = {id: v1(), text: text, checked: false};
        const AllTasks = [newTask, ...tasks];
        tasksObj[todolistID] = AllTasks;
        setTasks({...tasksObj})
    }
    const ChangeTasksFilter = (value: filterType, todolistID: string) => {
        let todolist = Todolists.find(tl => tl.id == todolistID);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...Todolists])
        }
    }
    const changeTaskStatus = (taskID: string, changedStatus: boolean, todolistID: string) => {
        let tasks = tasksObj[todolistID];
        let task = tasks.find(t => t.id == taskID);
        if (task) {
            task.checked = changedStatus;
            setTasks({...tasksObj});
        }
    }
    const todolist1ID = v1();
    const todolist2ID = v1();
    const [Todolists, setTodolists] = useState<Array<TodolistsProps>>([
        {id: todolist1ID, title: "What to learn", filter: "active"},
        {id: todolist2ID, title: "What to buy", filter: "completed"},
    ])
    const [tasksObj, setTasks] = useState({
        [todolist1ID]: [
            {id: v1(), text: "HTML", checked: true},
            {id: v1(), text: "CSS", checked: true},
            {id: v1(), text: "JS/TS", checked: false},
            {id: v1(), text: "REACT/REDUX", checked: false},
        ],
        [todolist2ID]: [
            {id: v1(), text: "milk", checked: false},
            {id: v1(), text: "bread", checked: true},
        ]
    })
    const DeleteTodolist = (todolistID: string) => {
        let FilteredTodolists = Todolists.filter(tl => tl.id != todolistID);
        setTodolists(FilteredTodolists);
        delete tasksObj[todolistID];
        setTasks({...tasksObj})
    }
    const addTodolist = (title: string) => {
        const todolist_ID = v1();
        const newTodolist: TodolistsProps = {
            id: todolist_ID,
            title,
            filter: "all"
        }
        setTodolists([...Todolists, newTodolist]);
        setTasks({...tasksObj, [todolist_ID]: []})
    }
    const changeTaskTitle = (taskID: string, newValue: string, todolistID: string) => {
        let tasks = tasksObj[todolistID];
        let task = tasks.find(t => t.id == taskID);
        if (task) {
            task.text = newValue;
            setTasks({...tasksObj});
        }
    }
    const changeTodolistTitle = (newTitle: string, todolistID: string) => {
        let todolist = Todolists.find(tl => tl.id == todolistID);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...Todolists])
        }
    }
    return (
        <div className="Todolist">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        Todolists.map(tl => {
                            let tasksForTodolist = tasksObj[tl.id];
                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.checked);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.checked);
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding: "10px"}}>
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
                                            deleteTodolist={DeleteTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default App;
