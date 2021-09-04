import { login, logout} from '../../actions/auth';

test('Testing login', () => {
    const uid = 'bnnkeereegreggg';

    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid: uid
    });
});

test('Testing logout', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});