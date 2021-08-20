import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses' // test data
import moment from 'moment';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([ expenses[0], expenses[2]]);
});

test('should not remove any expenses if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        id: 4,
        description: 'Phone Bill',
        note: '',
        amount: 4000,
        createdAt: moment(0).valueOf()
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[1], expenses[2], expense]); // could also be ...expenses, expense
});

test('should edit an expense', () => {
    const expenseEdit = {
        description: 'Monthly Rent',
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: expenseEdit
    };
    const state = expensesReducer(expenses, action);
    expect(state[1].description).toBe('Monthly Rent');
});

test('should not edit an expense if id not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: undefined
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should set expenses', () => {
// Set up the action object that would normally exist
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    };
    // Now test the reducer by calling it with our mocked up data
    const state = expensesReducer(expenses, action);

    // test with expect, check to see if the resulting state, set by the reducer, matches the one arry item we passed in
    expect(state).toEqual([expenses[1]]);
});