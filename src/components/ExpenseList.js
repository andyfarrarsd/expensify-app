import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

 // Use array map to iterate through the expenses array creating an array of expenselistitems
export const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {
            props.expenses.map((expense, index) => {
                return <ExpenseListItem key={expense.id} {...expense} /> // use spread operator to send all the elements of expense
            // Could also pass expense and then access props.each element in ELI
            })
        }
    </div>
);

// This function maps state to local props. below sets a props var that includes all our expenses
const mapStateToProps = (state) => {
    return{
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);