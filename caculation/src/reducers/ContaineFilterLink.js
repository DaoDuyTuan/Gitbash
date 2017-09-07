import expect from 'expect'
import {createStore} from 'redux';
import {combineReducers} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';


const deepFreeze = require('deep-freeze');

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];

        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

export const todoApp = combineReducers({
    todos,
    visibilityFilter
});

class FilterLink extends React.Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const state = store.getState();


        return (
            <Link active={props.filter === state.visibilityFilter}
                  onClick={() => store.dispatch({type: 'SET_VISIBILITY_FILTER', filter: props.filter})}>
                {props.children}
            </Link>
        );
    }
}

const Link = ({active, children, onClick}) => {
    if (active) {
        return <span>{children}</span>
    }

    return (
        <a href="#" onClick={e => {
            e.preventDefault();
            onClick();
        }}> {children}</a>
    );
};

const Footer = () => {
    return (
        <p>
            Show:
            {' '}
            <FilterLink filter='SHOW_ALL'>All</FilterLink>
            {' '}
            <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
            {' '}
            <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
        </p>
    )
};

const Todo = ({onClick, completed, text}) => (
    <li
        onClick={onClick} style={{textDecoration: completed ? 'line-through' : 'none'}}
    >
        {text}
    </li>
);

const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {todos.map(todo => <Todo key={todo.id}{...todo} onClick={() => onTodoClick(todo.id)}/>)}
    </ul>
);

const AddTodo = ({onAddOnClick}) => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>

            <button onClick={() => {
                onAddOnClick(input.value);
                input.value = '';
            }}>
                Add Todo
            </button>
        </div>
    )
};

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
            );
    }
};
let increment = 0;

const TodoApp = ({todos, visibilityFilter}) => (
    <div>
        <AddTodo onAddOnClick={text => store.dispatch({
            type: 'ADD_TODO',
            id: increment++,
            text
        })}/>

        <TodoList todos={getVisibleTodos(todos, visibilityFilter)} onTodoClick={id => store.dispatch({
            type: 'TOGGLE_TODO',
            id
        })}/>

        <Footer />
    </div>
);

const store = createStore(
    todoApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const render = () => {
    ReactDOM.render(
        <TodoApp {...store.getState()}/>,
        document.getElementById('root')
    );
};

render();
store.subscribe(render);