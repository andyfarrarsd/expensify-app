// Expenses Reducer

const expensesReducerDefaultState = [];

// this exports the ExpensesReducer function
export default (state = expensesReducerDefaultState, action) => {
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
