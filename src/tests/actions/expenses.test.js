import {
  setExpenses,
  startSetExpenses,
  addExpense,
  startAddExpense,
  removeExpense,
  startRemoveExpense,
  editExpense,
  startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { app } from '../../firebase/firebase';
import {getDatabase, off, ref, set, get, onValue, onChildRemoved, onChildChanged, onChildAdded, update, remove, push} from 'firebase/database';

const createMockStore = configureMockStore([thunk]);
const db = getDatabase(app);

// upload some content to firebase before tests
beforeEach((done) => {
  const expensesData = {};

  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });

  set(ref(db, 'expenses'), expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should remove expenses from firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[0].id;

  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });

    // verify expense with id: id is not there anymore. We return the promise in order to chain and avoid too much nesting
    return get(ref(db, `expenses/${id}`));
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value'});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: { note: 'New note value' }
  });
});

test('should edit expenses from firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[0].id;

  const updates = {
    amount: 3000,
  };
  
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });

    return get(ref(db, `expenses/${id}`)); // we pass the promise in order to chain later
  }).then((snapshot) => {
    expect(snapshot.val().amount).toBe(updates.amount);
    done();
  });
});

test('should setup add expense action object', () => {
  const action = addExpense(expenses[-1]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[-1]
  });
});

// it is async test
test('should add expense to database firebase and store', (done) => {
  const store = createMockStore({});

  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  }

  // it is async test. We need to wait until everything is complete. How? (using 'done') and promises chaining
  store.dispatch(startAddExpense(expenseData)).then(() => {
    // we expect callback will be called after first promise resolved
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return get(ref(db, `expenses/${actions[0].expense.id}`));
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefault = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  }

  // it is async test. We need to wait until everything is complete. How? (using 'done') and promises chaining
  store.dispatch(startAddExpense(expenseDefault)).then(() => {
    // we expect callback will be called after first promise resolved
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefault
      }
    });

    return get(ref(db, `expenses/${actions[0].expense.id}`));
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefault);
    done();
  });
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

