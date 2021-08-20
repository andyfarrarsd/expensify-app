import uuid from 'uuid';
import database from '../firebase/firebase';

//Orig non-firebase steps
// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

// New set of steps
// compoent call action generator
// action generator returns function
// component dispatches function (?)
// function runs (has the ability to dispatch other actions and do watever it wants)


///ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0 
        } = expenseData;
        const expense = { description, note, amount, createdAt };

        // save data to firebase and get the firebase key to use as the id in Redux
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
  });

  // EDIT_EXPENSE
  export const editExpense = (id, updates) => ({
      type: 'EDIT_EXPENSE',
      id,
      updates
  });

  //SET_EXPENSES
  export const setExpenses = (expenses) => ({
      type: 'SET_EXPENSES',
      expenses
  });

  export const startSetExpenses = () => {
    return (dispatch) => {

        // This gets all the data from Firebase and then converts it into an expenses array
        return database.ref('expenses').once('value').then((snapshot) => {
            const expenses = [];
            //snapshot is a sequence of id, val pairs, this combined then and pushes onto the array
            snapshot.forEach( (childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });        
            });

           // now dispatch the SET_EXPENSES action to refresh the screen with our values
           dispatch(setExpenses(expenses));
        });
    };
};
