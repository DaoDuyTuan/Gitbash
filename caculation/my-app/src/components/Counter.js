import React from 'react'
import showResult from '../reducers/index';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {connect} from 'react-redux';
import App from "../../../src/App";

const store = createStore(
    showResult,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

let increment = 0;

class Counter extends React.Component {
    render() {
        return (
            <div>
                <label>Name
                    <input ref={node => {
                        this.name = node
                    }}/>
                </label>
                <button onClick={() => {
                    store.dispatch({
                        type: 'hehe',
                        text: this.name.value,
                        id: increment++
                    })
                }}>
                    Add Todo
                </button>
                <ul>
                    {this.props.hehe.map((todo) =>
                        <li key={todo.id}>
                            {todo.text}
                        </li>
                    )}
                </ul>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {hehe: state.showResult};
}

class AppData extends React.Component {
    render() {
        return <div>{this.props.hehe.id}</div>
    }
}

const Visible = connect(mapStateToProps)(AppData);
const render = () => {
    ReactDOM.render(
    <div>
        <Counter hehe={store.getState()}/>
    </div>,
        document.getElementById('root')
)
};

render();
store.subscribe(render);