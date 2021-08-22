import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Store } from 'tough-cookie';
import { startAddExpense, 
        addExpense, 
        editExpense, 
        removeExpense, 
        setExpenses, 
        startSetExpenses,
        startRemoveExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from  '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id , description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref('expenses').set(expensesData).then(() => done());
});


test('should setup remove expense action object', () => {
    const action = removeExpense( { id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('Testing should remove expense from firebase and store', (done) => {
    const store = createMockStore({}); //redux-mock-store  

        // We should have all three test items in the test firebase 
        // Test the removal of the first of the expenses
        //expenses array is set up for each test to include all the test data matching firebase
        const id = expenses[0].id;
        store.dispatch(startRemoveExpense( { id } )).then(() => {
        const actions = store.getActions();

        // Expect that the stores action list has REMOVE_EXPENSE on it with our id
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });

        // Check the database to make sure the data was saved
        return database.ref(`expenses/${id}`).once('value');  // this returns a snaphot to the next promise

    }).then((snapshot) => {  //example of promise chaining since the call above returns
        expect(snapshot.val()).toBeFalsy();   // note if val is null then no data was found, this checks for null
        done();
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

test('should setuo set expense action object withh data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('Testing should fetch the expenses from firebase', (done) => {
    const store = createMockStore({}); //redux-mock-store  

    store.dispatch(startSetExpenses()).then(() => {

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});


