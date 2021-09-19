import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import getExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';


// Add total as an H1 block
export const ExpenseSummary = ( { expenseCount=0, expensesTotal=0} ) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00')

    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord} totaling <span>{ formattedExpensesTotal }</span> </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );
};

// This function is used to set up props based on current state. We set up the visibileExpenses array for this purpose
const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);

    return{
        expenseCount: visibleExpenses.length,
        expensesTotal: getExpensesTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpenseSummary);
