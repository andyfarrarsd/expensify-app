import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';  // for named exports i.e. not default
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses'; // this is default so no brackets
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app')); 
        hasRendered = true;
    }
}

// Render something thhat says we are getting data
ReactDOM.render(<p> Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
       // dipatch the startSetExpenses to geet the users data
        store.dispatch(startSetExpenses()).then(() => {
          renderApp();
          // check to see if we should redirect
          if (history.location.pathname === '/') {
              history.push('/dashboard');
          }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});
