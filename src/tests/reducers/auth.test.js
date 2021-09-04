import authReducer from '../../reducers/auth';


test('should cause login state to set uid', () => {
    const uid = 'ccbchbhddfdfuhef';

    // Set up the action object that would normally exist
    const action = {
        type: 'LOGIN',
        uid: uid
    };
    // Now test the reducer by calling it with our mocked up data
    const state = authReducer( {}, action);
    
    // test with expect, check to see if the resulting state, set by the reducer, matches the one arry item we passed in
    expect(state.uid).toBe( uid) ;
});

test('should cause login state to reset to empty', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer( {uid: 'anything'}, action );
    expect(state).toBeUndefined;
});