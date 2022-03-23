import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const id = expenses[0].id;
  const action = {
    type: 'REMOVE_EXPENSE',
    id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1], expenses[2]]);
});

test('should not remove expense if id not found', () => {
  const id = '3213';
  const action = {
    type: 'REMOVE_EXPENSE',
    id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const expense = {
    id: '4',
    description: 'Bills',
    note: '',
    amount: 10000,
    createdAt: moment(0).add(10, 'days').valueOf()
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
  const id = expenses[0].id;
  const updates = { note: 'New note value'};
  const action = {
    type: 'EDIT_EXPENSE',
    id,
    updates
  };

  const state = expensesReducer(expenses, action);

  expect(state[0].note).toBe('New note value');
});

test('should not edit expense if expense not found', () => {
  const id = '1233'
  const updates = { note: 'New note value'};
  const action = {
    type: 'EDIT_EXPENSE',
    id,
    updates
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  // we get one expense from fixture.
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };

  // we start reducer state with all the expenses and we expect only one as result of the action
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});
