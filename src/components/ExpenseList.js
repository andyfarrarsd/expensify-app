import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

 // Use array map to iterate through the expenses array creating an array of expenselistitems
export const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>

        <div className="list-body">
        {
            props.expenses.length === 0 ? (
                <div className="list-item list-item--message">
                  <span>No expenses</span>
                </div>
            ) : (
                props.expenses.map((expense, index) => {
                    return <ExpenseListItem key={expense.id} {...expense} /> // use spread operator to send all the elements of expense
                })
            )
        }
        </div>
    </div>
);

// This function maps state to local props. below sets a props var that includes all our expenses
const mapStateToProps = (state) => {
    return{
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);