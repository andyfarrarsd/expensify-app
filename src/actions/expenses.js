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

// Async actions to send data to firebase (network database), using thunk? 
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

        // save data to firebase and get the firebase key to use as the id in Redux
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => { // uses template string must use ``  not ''
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

export const startRemoveExpense = ({ id } = {}) => { //If no id is passed to us then just return
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
        // Find the eepense and then remove it
        return database.ref(`users/${uid}/expenses/${id}`).remove()
            .then(() => {
                dispatch(removeExpense( {id }));
            })
            .catch( (e) => {
                console.log('Removal failed', e);
            });
    };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
      type: 'EDIT_EXPENSE',
      id,
      updates
});

export const startEditExpense = (id, updates ) => { //Should check to see If no id is passed to us then just return
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        // Find the eepense and then remove it
        return database.ref(`users/${uid}/expenses/${id}`).update( updates )
            .then(() => {
                dispatch(editExpense( id, updates ));
            })
            .catch( (e) => {
                console.log('Update of data failed', e);
            });
    };
};


//SET_EXPENSES
export const setExpenses = (expenses) => ({
      type: 'SET_EXPENSES',
      expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        // This gets all the data from Firebase and then converts it into an expenses array
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
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


