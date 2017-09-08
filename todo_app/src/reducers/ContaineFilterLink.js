import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {PropTypes} from 'react';
import {connect} from 'react-redux';

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
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {store} = this.context;
        const state = store.getState();

        return (
            <Link active={this.props.filter === state.visibilityFilter}
                  onClick={() => store.dispatch({type: 'SET_VISIBILITY_FILTER', filter: this.props.filter})}>
                {this.props.children}
            </Link>
        );
    }
}

FilterLink.contextTypes = {
    store: PropTypes.object
};

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
        {todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)}/>)}
    </ul>
);

let AddTodo = ({dispatch}) => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>

            <button onClick={() => {
                dispatch({
                    type: 'ADD_TODO',
                    id: increment++,
                    text: input.value
                });
                input.value = '';
            }}>
                Add Todo
            </button>
        </div>
    )
};

AddTodo = connect()(AddTodo);

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

// class VisibleTodoList extends React.Component {
//     componentDidMount() {
//         const {store} = this.context;
//         this.unsubscribe = store.subscribe(() => this.forceUpdate());
//     }
//
//     componentWillUnmount() {
//         this.unsubscribe();
//     }
//
//     render() {
//         const {store} = this.context;
//         const state = store.getState();
//
//         return (
//             <TodoList todos={getVisibleTodos(state.todos, state.visibilityFilter)}
//                       onTodoClick={id => store.dispatch({type: 'TOGGLE_TODO'}, id)}/>
//         )
//     }
// }

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: id => dispatch({type: 'TOGGLE_TODO'}, id)
    };
};

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

let increment = 0;
const TodoApp = () => (
    <div>
        <AddTodo/>

        <VisibleTodoList/>

        <Footer/>
    </div>
);

// class Provider extends React.Component {
//     getChildContext() {
//         return {
//             store: this.props.store
//         };
//     }
//
//     render() {
//         return this.props.children;
//     }
// }
//
// Provider.childContextTypes = {
//     store: PropTypes.object
// };

ReactDOM.render(
    <Provider store={createStore(todoApp,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
        <TodoApp/>
    </Provider>,
    document.getElementById('root')
);
