export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function deepEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

export function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}