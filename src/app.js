import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';  // for named exports i.e. not default
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses'; // this is default so no brackets
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

// Render something thhat says we are getting data
ReactDOM.render(<p> Loading...</p>, document.getElementById('app'));

// dipatch the get data call and use a then promise to render teh app once we ahve the data
store.dispatch(startSetExpenses()).then(() => {
 ReactDOM.render(jsx, document.getElementById('app'));   
});

