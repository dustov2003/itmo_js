export function createStore(reducer, initialState) {
    let state = initialState;
    const listeners = [];

    return {
        getState: () => state,
        dispatch: action => {
            state = reducer(state, action);
            listeners.forEach(fn => fn());
        },
        subscribe: fn => {
            listeners.push(fn);
            return () => {
                const i = listeners.indexOf(fn);
                if (i > -1) {
                    listeners.splice(i, 1);
                }
            };
        },
    };
}
