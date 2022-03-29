import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import moment from 'moment';
import { auth } from './firebase/firebase';
import LoadingPage  from './components/LoadingPage';

// testing playground load
// import './playground/promises';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
  }
  hasRendered = true;
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// We would like to redirect user base on our logic. But we are not inside a router component.
// In order to use history API we install history npm pkg and add manually to
// Router. Then we can use it everywhere is needed
// Use use Router instead of BrowserRouter component
auth.onAuthStateChanged((user) => {
  if (user) {
    // Here we know a user is logged in
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      // If we are on the login page, redirect to the dashboard
      // TODO: tmp in order to get the login page even if we are loggedin . We need to fix this at router level
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
    console.log("Log in");
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
    console.log('Logged out');
  }
});
