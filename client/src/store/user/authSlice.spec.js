import userReducer, {
    updateUser,
    logoutUser
} from './authSlice';

describe('user reducer', () => {
    const initialState = {
        value: { name: "null", email: "null", uid: "null" },
        status: 'idle',
    };
    it('should handle initial state', () => {
        expect(userReducer(undefined, { type: 'unknown' })).toEqual({
            value: { name: "null", email: "null", uid: "null" },
            status: 'idle',
        });
    });

    // it('should handle increment', () => {
    //   const actual = userReducer(initialState, increment());
    //   expect(actual.value).toEqual(4);
    // });

    // it('should handle decrement', () => {
    //   const actual = userReducer(initialState, decrement());
    //   expect(actual.value).toEqual(2);
    // });
    it('should handle logout', () => {
        const actual = userReducer(initialState, logoutUser());
        expect(actual.value).toEqual({ name: "null", email: "null", uid: "null" });
    });
    it('should handle update user', () => {
        const actual = userReducer(initialState, updateUser({ name: "n", email: "e", uid: "u" }));
        expect(actual.value).toEqual({ name: "n", email: "e", uid: "u" });
    });
});
