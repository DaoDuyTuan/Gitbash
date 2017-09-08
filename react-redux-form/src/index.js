import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {handleForm} from './Reducers/handleForm';
import App from './Components'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={createStore(handleForm,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
