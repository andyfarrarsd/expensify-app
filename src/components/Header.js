import React from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';


// Add Header and basic links
export const Header = ( { startLogout }) => (
    <header>  
    <h1>Expensify</h1>
            <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard </NavLink>
            <NavLink to="/create" activeClassName="is-active">Create Expense </NavLink>
            <button onClick={ startLogout}>Logout</button>
    </header>
);

// This is the wierd redux connection for action dispatching
const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});


export default connect(undefined, mapDispatchToProps)(Header);