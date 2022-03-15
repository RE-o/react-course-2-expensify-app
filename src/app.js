import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
// import { setTextFilter } from './actions/filters';
// import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import moment from 'moment';

const store = configureStore();

store.dispatch(addExpense({
  description: 'Water bill',
  amount: 4000,
  createdAt: moment().subtract(3, 'days').valueOf()
}));

store.dispatch(addExpense({
  description: 'Gas bill',
  amount: 5000,
  createdAt: moment().subtract(1, 'days').valueOf()
}));

store.dispatch(addExpense({
  description: 'Refrigerator',
  amount: 10000,
  createdAt: moment().valueOf()
}));

// store.dispatch(setTextFilter('bill'));
// store.dispatch(setTextFilter('water'));

// setTimeout(() => {
//   console.log('set filter');
//   store.dispatch(setTextFilter('bill'));
// }, 2000);

// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(store.getState());

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);


ReactDOM.render(jsx, document.getElementById('app'));
