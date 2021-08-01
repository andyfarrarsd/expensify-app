import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Store } from 'tough-cookie';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from  '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () => {
    const action = removeExpense( { id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('Should setup edit expense action object', () => {
    const action = editExpense( '123abc', { amount: 2000, note: 'this is a note'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: { amount: 2000, note: 'this is a note'}
    });
});

test('Testing setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

// pass in done to test case to tell jest that it includes asyncronis calls/tests
test('Testing should add expense to database and store', (done) => {
    const store = createMockStore({}); //redux-mock-store  
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'Tis one is better',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        // Check the database to make sure the data was saved
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');

    }).then((snapshot) => {  //example of promise chaining since the call above returns
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('Testing should add expense with defaults to database and store', (done) => {
    const store = createMockStore({}); //redux-mock-store  
    const expenseData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0 
    };

    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        // Check the database to make sure the data was saved
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');

    }).then((snapshot) => {  //example of promise chaining since the call above returns
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

// test('Testing setup add expense action object with no values', () => {

//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0,
//             id: expect.any(String)
//         }
//     });
// });

