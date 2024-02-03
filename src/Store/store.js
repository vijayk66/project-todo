import { createStore } from "redux";


const initial_state = {
    completed_todo: [],
    deleted_todo: [],
};

const rootReducer = (state = initial_state, action) => {
    switch (action.type) {
        case "COMPLETED": {
            localStorage.setItem("completed", JSON.stringify([...state.completed_todo, action.payload]));
            return (
                { ...state, completed_todo: [...state.completed_todo, action.payload] }
            );
        };
        case "DELETED": return (
            { ...state, completed_todo: state.completed_todo.filter(item => item.id !== action.payload.id) }
        );
        default: {
            let completed_todos = JSON.parse(localStorage.getItem("completed")) || [];
            return {
                ...state,
                completed_todo: completed_todos,
            }
        };
    };
}

export const store = createStore(rootReducer);


export const updateCompleted = (completed) => {
    return {
        type: "COMPLETED",
        payload: completed,
    };
};

export const updateDeleted = (deleted) => {
    return {
        type: "DELETED",
        payload: deleted,
    };
};