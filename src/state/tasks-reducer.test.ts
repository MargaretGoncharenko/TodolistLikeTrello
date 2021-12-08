import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from './tasks-reducer';
import {tasksStateType} from '../App';
test('correct task should be deleted from correct array', () => {
    const startState: tasksStateType = {
        "todolistId1": [
            { id: "1", text: "CSS", checked: false },
            { id: "2", text: "JS", checked: true },
            { id: "3", text: "React", checked: false }
        ],
        "todolistId2": [
            { id: "1", text: "bread", checked: false },
            { id: "2", text: "milk", checked: true },
            { id: "3", text: "tea", checked: false }
        ]
    };
    const action = deleteTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", text: "CSS", checked: false },
            { id: "2", text: "JS", checked: true },
            { id: "3", text: "React", checked: false }
        ],
        "todolistId2": [
            { id: "1", text: "bread", checked: false },
            { id: "3", text: "tea", checked: false }
        ]
    });
});

test('correct task should be added to correct array', () => {
    const startState: tasksStateType = {
        "todolistId1": [
            { id: "1", text: "CSS", checked: false },
            { id: "2", text: "JS", checked: true },
            { id: "3", text: "React", checked: false }
        ],
        "todolistId2": [
            { id: "1", text: "bread", checked: false },
            { id: "2", text: "milk", checked: true },
            { id: "3", text: "tea", checked: false }
        ]
    };
    const action = addTaskAC("juice", "todolistId2");
    const endState = tasksReducer(startState, action)
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].text).toBe("juice");
    expect(endState["todolistId2"][0].checked).toBe(false);
});

test('status of specified task should be changed', () => {
    const startState: tasksStateType = {
        "todolistId1": [
            { id: "1", text: "CSS", checked: false },
            { id: "2", text: "JS", checked: true },
            { id: "3", text: "React", checked: false }
        ],
        "todolistId2": [
            { id: "1", text: "bread", checked: false },
            { id: "2", text: "milk", checked: true },
            { id: "3", text: "tea", checked: false }
        ]
    };
    const action = changeTaskStatusAC("2", false, "todolistId2");
    const endState = tasksReducer(startState, action)
    expect(endState["todolistId2"][1].checked).toBe(false);
    expect(endState["todolistId1"][1].checked).toBe(true);
});

test('title of specified task should be changed', () => {
    const startState: tasksStateType = {
        "todolistId1": [
            { id: "1", text: "CSS", checked: false },
            { id: "2", text: "JS", checked: true },
            { id: "3", text: "React", checked: false }
        ],
        "todolistId2": [
            { id: "1", text: "bread", checked: false },
            { id: "2", text: "milk", checked: true },
            { id: "3", text: "tea", checked: false }
        ]
    };
    const action = changeTaskTitleAC("2", "potato", "todolistId2");
    const endState = tasksReducer(startState, action)
    expect(endState["todolistId2"][1].text).toBe("potato");
    expect(endState["todolistId1"][1].text).toBe("JS");
});