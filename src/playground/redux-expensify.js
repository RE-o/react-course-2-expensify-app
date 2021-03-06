import { createStore, combineReducers } from 'redux';
import uuid  from 'uuid';

// Actions needed
// ADD_EXPENSE
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE

const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});
// EDIT_EXPENSE

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});
// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});
// SET_START_DATE
const setStartDate = (startDate) => ({ // no need to set default value to undefined. Its iplicit in the language
  type: 'SET_START_DATE',
  startDate
});
// SET_END_DATE

const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

// EXPENSES REDUCER
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => (expense.id === action.id) ? { ...expense, ...action.updates} : expense);
    default:
      return state;
  }
};

const filterReducerDefaultState = {
  text: '',
  sortBy: 'date', // date or amount
  startDate: undefined,
  endDate: undefined
}

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
}

// timestamps
// 0 is January 1st 1977 (unix epoc)

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortByAmount,sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
      if (sortBy === 'date') { // note that createdAt default to 0
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filterReducer
  })
);

// monitor with
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
  // console.log(state.filters);
});

const expenseOne = store.dispatch(addExpense({
  description: 'Rent',
  amount: 100, // penies
  createdAt: -10000
}));

const expenseTwo = store.dispatch(addExpense({
  description: 'Cofee',
  amount: 300, // penies
  createdAt: -1000
}));

// store.dispatch(removeExpense({
//   id: expenseOne.expense.id
// }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter('fee'));
// store.dispatch(setTextFilter(''));
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(3000));
// store.dispatch(setEndDate());
// ################################## Lab ###################################

// Object spread operator
// const user = {
//   name: 'Jen',
//   age: 21
// }

// console.log({
//   ...user,
//   age: 28,
//   location: 'Phil'
// });

// const demoState = {
//   expenses: [{
//     id: 'ijidoeiwjoi',
//     description: 'January rent',
//     note: 'This is the final payments for that address',
//     ammount: 53500, // penies
//     createdAt: 0
//   }],
//   filters: {
//     text: 'rent',
//     sortBy: 'amount', // date or amount
//     startDate: undefined,
//     endDate: undefined
//   }
// };


