import authReducer, { loginStart, loginSuccess, loginFailure, logout, setUser } from '../authSlice';

describe('authSlice', () => {
    const initialState = {
        user: null,
        token: null,
        loading: false,
        error: null,
    };

    it('should handle initialState', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle loginStart', () => {
        const actual = authReducer(initialState, loginStart());
        expect(actual.loading).toBe(true);
        expect(actual.error).toBeNull();
    });

    it('should handle loginSuccess', () => {
        const user = { username: 'testuser' };
        const token = 'testtoken';
        const actual = authReducer(initialState, loginSuccess({ user, accessToken: token }));
        expect(actual.loading).toBe(false);
        expect(actual.user).toEqual(user);
        expect(actual.token).toBe(token);
    });

    it('should handle loginFailure', () => {
        const error = 'Invalid credentials';
        const actual = authReducer(initialState, loginFailure(error));
        expect(actual.loading).toBe(false);
        expect(actual.error).toBe(error);
    });

    it('should handle logout', () => {
        const loggedInState = {
            user: { username: 'testuser' },
            token: 'testtoken',
            loading: false,
            error: null,
        };
        const actual = authReducer(loggedInState, logout());
        expect(actual.user).toBeNull();
        expect(actual.token).toBeNull();
    });

    it('should handle setUser', () => {
        const newUser = { username: 'newuser' };
        const actual = authReducer(initialState, setUser(newUser));
        expect(actual.user).toEqual(newUser);
    });
});
