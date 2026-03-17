import { describe, it, expect } from 'vitest';
import { createStore } from '../store/createStore.js';
import { taskReducer } from '../store/reducers.js';
import { clone, deepEqual, debounce } from '../utils/helpers.js';

describe('MiniRedux Store', () => {
    it('должен создавать стор с начальным состоянием', () => {
        const store = createStore(taskReducer, { tasks: [] });
        expect(store.getState().tasks).toEqual([]);
    });

    it('должен добавлять задачу через dispatch', () => {
        const store = createStore(taskReducer, { tasks: [] });
        store.dispatch({ type: 'ADD_TASK', payload: 'Test' });
        expect(store.getState().tasks.length).toBe(1);
        expect(store.getState().tasks[0].text).toBe('Test');
    });

    it('должен удалять задачу', () => {
        const store = createStore(taskReducer, { tasks: [] });
        store.dispatch({ type: 'ADD_TASK', payload: 'Test' });
        const id = store.getState().tasks[0].id;
        store.dispatch({ type: 'REMOVE_TASK', payload: id });
        expect(store.getState().tasks.length).toBe(0);
    });

    it('должен переключать статус задачи', () => {
        const store = createStore(taskReducer, { tasks: [] });
        store.dispatch({ type: 'ADD_TASK', payload: 'Test' });
        const id = store.getState().tasks[0].id;
        store.dispatch({ type: 'TOGGLE_TASK', payload: id });
        expect(store.getState().tasks[0].completed).toBe(true);
    });

    it('должен уведомлять подписчиков', () => {
        const store = createStore(taskReducer, { tasks: [] });
        let called = false;
        store.subscribe(() => { called = true; });
        store.dispatch({ type: 'ADD_TASK', payload: 'Test' });
        expect(called).toBe(true);
    });
});

describe('Utils', () => {
    it('clone должен создавать глубокую копию', () => {
        const obj = { a: 1, b: { c: 2 } };
        const copy = clone(obj);
        expect(copy).toEqual(obj);
        expect(copy).not.toBe(obj);
        expect(copy.b).not.toBe(obj.b);
    });

    it('deepEqual должен сравнивать объекты', () => {
        expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
        expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    it('debounce должен задерживать вызов', () => {
        return new Promise((resolve) => {
            let called = 0;
            const fn = debounce(() => called++, 50);
            fn();
            fn();
            fn();
            expect(called).toBe(0);
            setTimeout(() => {
                expect(called).toBe(1);
                resolve();
            }, 100);
        });
    });
});