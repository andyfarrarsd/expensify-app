import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect} from 'react-router-dom';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';

// ...rest passes the rest of any props that were not destructured
export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) =>  (
        <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Redirect to="/dashboard"  />
        ) : (
            <Component  {...props} />
        )
        )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated:  !!state.auth.uid
}) // Note: !! converts an undefined to false and any defined value to true

export default connect(mapStateToProps)(PublicRoute);