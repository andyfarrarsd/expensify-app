// Export a stateless functional component
// Description, amount, createdAt
import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import numeral from 'numeral';

export const ExpenseListItem = ({ id, description, amount, createdAt }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p> 
         {numeral(amount / 100).format('$0,0.00')}
         -
         { moment(createdAt).format('MMMM Do, YYYY') }
        </p>
    </div>
);

//Need to connect this component to the store to get access to props
// (state)(component to connent to state)
export default ExpenseListItem;
