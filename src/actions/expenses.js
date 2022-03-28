import { getDatabase, off, ref, set, get, onValue, onChildRemoved, onChildChanged, onChildAdded, update, remove, push } from 'firebase/database';
import { app } from '../firebase/firebase';

const db = getDatabase(app);

// Actions needed
// ADD_EXPENSE. "... = {}" means that we set empty object as default
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense = { description, note, amount, createdAt };

    // here we need to return push... in order to use promise chaining (cfr. tests in actions/expenses)
    return push(ref(db, `users/${uid}/expenses`), expense).then((ref) => { // you need this return in order to do something after startAddExpense has completed

      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({id} = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return remove(ref(db, `/users/${uid}/expenses/${id}`)).then(() => { // you need this return in order to do something after startRemoveExpense has completed
      dispatch(removeExpense({id}));
    });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return update(ref(db, `/users/${uid}/expenses/${id}`), updates).then(() => { // you need this return in order to do something after startEditExpense has completed
      dispatch(editExpense(id, updates))
    });
  };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

// we need async action to fetch data
export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // get data and then parse it into an array
    return get(ref(db, `users/${uid}/expenses`)).then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setExpenses(expenses));
    });
  };
};
