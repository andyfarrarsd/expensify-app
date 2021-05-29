import { createStore } from 'redux';

//Action generators - functions that create action objects
// destrcutures the incoming object to a single name and sets a default value
const incrementCount = ({incrementBy = 1} = {}) => ({
        type: 'INCREMENT',
        incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
        type: 'DECREMENT',
        decrementBy
});

const resetCount = () => ({
        type: 'RESET'
});

const setCount = ({count = 0} = {}) => ({
        type: 'SET',
        count
});

// Reducers
// 1. Must be pure function
// 2. Never change state or action
const countReducer = (state = { count: 0}, action) => {
  switch(action.type) {
    case 'INCREMENT':
        const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
      count: state.count + incrementBy
      };
    case 'DECREMENT':
      const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;          
          return {
          count: state.count - decrementBy
          };
     case 'SET':
         return {
             count: action.count
         }
     case 'RESET':
          return {
          count: 0
          };                         
    default:
      return state;
  }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe( () => {
console.log( store.getState());
});

// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });
store.dispatch(incrementCount({ incrementBy: 5}));

store.dispatch(incrementCount());

store.dispatch(decrementCount({ decrementBy: 10}));

store.dispatch(incrementCount());

store.dispatch(incrementCount());

//unsubscribe();

store.dispatch(resetCount());

store.dispatch(setCount({count: 101}));


