export function taskReducer(state, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, { id: Date.now(), text: action.payload, completed: false }],
            };
        case 'REMOVE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(t => t.id !== action.payload),
            };
        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(t =>
                    t.id === action.payload ? { ...t, completed: !t.completed } : t
                ),
            };
        case 'EDIT_TASK':
            return {
                ...state,
                tasks: state.tasks.map(t =>
                    t.id === action.payload.id ? { ...t, text: action.payload.text } : t
                ),
            };
        default:
            return state;
    }
}
