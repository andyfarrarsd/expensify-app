import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect} from 'react-router-dom';
import Header from '../components/Header'; 

// ...rest passes the rest of any props that were not destructured
export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) =>  (
        <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header/>
                <Component  {...props} />
            </div>
        ) : (
            <Redirect to="/"  />
        )
        )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated:  !!state.auth.uid
}) // Note: !! converts an undefined to false and any defined value to true

export default connect(mapStateToProps)(PrivateRoute);