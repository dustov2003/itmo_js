import { BaseComponent } from '../core/BaseComponent.js';

export default class TaskItem extends BaseComponent {
    constructor(task, onRemove, onToggle) {
        super('div');
        this.task = task;
        this.onRemove = onRemove;
        this.onToggle = onToggle;
        this.render();
    }

    render() {
        this.element.innerHTML = '';
        this.setAttr('class', 'task-item');
        
        const leftDiv = new BaseComponent('div')
            .setStyle({ display: 'flex', alignItems: 'center', gap: '10px' })
            .mount(this.element);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this.task.completed;
        checkbox.onchange = () => this.onToggle(this.task.id);

        const text = new BaseComponent('span')
            .setText(this.task.text)
            .setStyle({ 
                textDecoration: this.task.completed ? 'line-through' : 'none',
                color: this.task.completed ? '#888' : '#000'
            })
            .mount(leftDiv.element);

        leftDiv.element.prepend(checkbox);

        const delBtn = document.createElement('button');
        delBtn.textContent = '🗑';
        delBtn.className = 'delete';
        delBtn.onclick = () => this.onRemove(this.task.id);
        this.element.appendChild(delBtn);
    }
}