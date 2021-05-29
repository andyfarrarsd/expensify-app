import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

///ADD_EXPENSE
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
        id:uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
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

  // SET_START_DATE   -  these set up the action javascript object passed to the reducer
  const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
  });

  // SET_END_DATE
  const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
  });

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
      case 'ADD_EXPENSE':
          return [
              ...state,
              action.expense
          ]
      case 'REMOVE_EXPENSE': //destruct from expense to just id
          return state.filter(( { id }) => id !== action.id);
      case 'EDIT_EXPENSE':
          return state.map((expense) => {
            if (expense.id === action.id) {
                return {
                    ...expense, // Says we weant to return the expense object
                    ...action.updates   // but this overrides any current properties on the object based on whatever is psssed in via updates
                };
            } else {
              return expense;
            };
            });
      default:
          return state;
  }
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date', // date or amount
    startDate: undefined,
    endDate: undefined
};
 
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':          
        return {
            ...state,
            text: action.text
        };
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
};


const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => { // this is the function to filter by, true doesnt filter false does
        // The typeof startDate !== 'number' returns true meaning any non number returns true
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDataMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDataMatch && textMatch;
    }).sort((a, b) => { //takes an array and returns an array
        if (sortBy === 'date') {
          return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
          return a.amount < b.amount ? 1 : -1;
        }
      });
};

// Store Creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe( () => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));

//const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount:100, createdAt: 1000}));
//const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount:300}));

//store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('Rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount()); // sortBy = amount
// store.dispatch(sortByDate()); // sortBy = date

// store.dispatch(setStartDate(125)); //startdate = 125
// store.dispatch(setStartDate()); // statedate = undefined

// store.dispatch(setEndDate(1250));
// store.dispatch(setEndDate());

const demoState = {
    expenses: [{
        id: 'freferfe',
        description: 'January Rent',
        note:'Additional info',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};