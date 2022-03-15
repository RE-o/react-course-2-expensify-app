import { createStore } from 'redux';

// Actions generators are functions returning action object

// const add = ({a, b}) => a + b;

// console.log(add({a: 1, b: 12}));

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  // incrementBy: incrementBy
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const resetCount = () => ({
  type: 'RESET'
});

const setCount = ({count} = {}) => ({
  type: 'SET',
  count
});

// Reducer
// 1. are pure functions
// 2. never change stae or action

const countReducer =  (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy // we are not changing the state
      };
    case 'RESET':
      return {
        count: 0 // we are not changing the state
      };
    case 'SET':
      return {
        count: action.count // we are not changing the state
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log( store.getState() );
});

// to unsubscribe run the function returned by store.subscribe
// unsubscribe();

// Actions - an object that gets send to the store

// I'd like to increment the count
// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5
// });

store.dispatch(incrementCount({ incrementBy: 5 }));

// store.dispatch({
//   type: 'RESET'
// });
store.dispatch(resetCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

// store.dispatch({
//   type: 'SET',
//   count: 101
// });

store.dispatch(setCount({ count: 102 }));
