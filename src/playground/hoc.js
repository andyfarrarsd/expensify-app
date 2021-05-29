// Higher Order Component (HOC) - A component (HOC) that renders another component
//Reuse Code
// Render Hijacking
// Prop manipulation
// abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
      <h1>Info</h1>
      <p>The Info is: {props.info}</p>
      </div>
);

// The spreading allows the props to be passed to the shild
const withAdminWarning = (WrappedComponent) => {    
    return (props) => (
        <div>
            { props.isAdmin && <p>This is private info. Please don't share</p>}
             <WrappendComponent {...props}/>
        </div>
    );
};

// The spreading allows the props to be passed to the shild
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <p>This is private info. Please don't share</p> &&
                <WrappedComponent {...props} />
            ) : (
                <p>Please Login</p>
            )}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={false} info="These are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details" />, document.getElementById('app'));
