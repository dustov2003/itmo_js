import { BaseComponent } from '../core/BaseComponent.js';
import TaskForm from './TaskForm.js';
import TaskItem from './TaskItem.js';
import Header from './Header.js';

export default class HomePage {
    constructor(store) {
        this.store = store;
        this.container = new BaseComponent('div');
        this.unsubscribe = null;
    }

    mount(parent) {
        parent.appendChild(this.container.element);
        this.render();
        this.unsubscribe = this.store.subscribe(() => this.render());
    }

    render() {
        this.container.element.innerHTML = '';
        const state = this.store.getState();

        new Header().mount(this.container.element);

        new BaseComponent('h1')
            .setText('📋 Мои задачи')
            .setStyle({ textAlign: 'center', color: '#333' })
            .mount(this.container.element);

        const stats = new BaseComponent('p')
            .setText(`Всего: ${state.tasks.length} | Выполнено: ${state.tasks.filter(t => t.completed).length}`)
            .setStyle({ textAlign: 'center', color: '#666', marginBottom: '20px' })
            .mount(this.container.element);

        new TaskForm((text) => {
            this.store.dispatch({ type: 'ADD_TASK', payload: text });
        }).mount(this.container.element);

        const list = new BaseComponent('div')
            .setAttr('class', 'task-list')
            .mount(this.container.element);

        if (state.tasks.length === 0) {
            new BaseComponent('p')
                .setText('Нет задач. Добавьте первую!')
                .setStyle({ textAlign: 'center', color: '#999' })
                .mount(list.element);
        } else {
            state.tasks.forEach(task => {
                new TaskItem(
                    task,
                    (id) => this.store.dispatch({ type: 'REMOVE_TASK', payload: id }),
                    (id) => this.store.dispatch({ type: 'TOGGLE_TASK', payload: id })
                ).mount(list.element);
            });
        }
    }

    unmount() {
        if (this.unsubscribe) this.unsubscribe();
        this.container.unmount();
    }
}