// Export a stateless functional component
// Description, amount, createdAt
import React from 'react';
import { Link } from 'react-router-dom'


export const ExpenseListItem = ({ id, description, amount, createdAt }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p> {amount} {createdAt}</p>
    </div>
);

//Need to connect this component to the store to get access to props
// (state)(component to connent to state)
export default ExpenseListItem;

//export default ExpenseListItem;

// <button
// className="button button--link" 
//     onClick={(e) => {
//         props.handleDeleteOption(props.optionText);
//     } }>
//     remove
// </button>

// <button onClick={() => {
//     //console.log("myid:"+id);
//     dispatch(removeExpense( {id} ));
// }}> Remove</button>