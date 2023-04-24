import appReducer, {
    fetchApp, fetchInvites
} from './appSlice';

describe('app reducer', () => {
    const initialState = {
        appt: [],
        invites: [],
        status: 'idle',
    };

    it('should handle initial state', () => {
        expect(appReducer(undefined, { type: 'unknown' })).toEqual({
            appt: [],
            invites: [],
            status: 'idle',
        });
    });
    it('should handle logout', () => {
        const actual = appReducer(initialState, fetchApp(uid));
        expect(actual.value).toEqual([]);
    });
    it('should handle update user', () => {
        const actual = appReducer(initialState, fetchInvites(uid));
        expect(actual.value).toEqual([]);
    });
});
