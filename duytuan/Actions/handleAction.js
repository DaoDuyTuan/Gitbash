import {ADD_TODO, SET_VISIBLE_FILTER, TOGGLE_TODO, VisibilityFilters} from "./action";

const initialState = {
    visibilityFilter: VisibilityFilter.SHOW_ALL,
    todos: []
};

function todoApp(state = initialState, action) {
    switch (action.type) {
        case SET_VISIBLE_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.type
            });
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        text: action.text,
                        completed: false
                    }
                ]
            });
        case TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.map((todo, index) => {
                    if (index === action.index) {
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    }
                    return todo
                })
            });
        default:
            return state;
    }
}

