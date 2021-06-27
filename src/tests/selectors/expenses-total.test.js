import getExpensesTotal from '../../selectors/expenses-total.js';
import expenses from '../fixtures/expenses' // test data


test('should return 0 if no expenses', () => {
    const result = getExpensesTotal([]); // empty array
    expect(result).toBe(0);
});

test('should correctly add up a single expense', () => {
    const singleExpenseArr = [];
    singleExpenseArr[0] = expenses[0];
    const result = getExpensesTotal(singleExpenseArr);
    expect(result).toEqual(195);  
});

test('should correctly add up multiple expenses', () => {
    const result = getExpensesTotal(expenses);
    expect(result).toEqual(114195);
});