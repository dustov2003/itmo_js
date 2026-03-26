import { BaseComponent } from '../core/BaseComponent.js';

export default class TaskItem extends BaseComponent {
    constructor(task, onRemove, onToggle, onEdit) {
        super('div');
        this.task = task;
        this.onRemove = onRemove;
        this.onToggle = onToggle;
        this.onEdit = onEdit;
        this.render();
    }

    render() {
        this.element.innerHTML = '';
        this.setAttr('class', 'task-item');

        const leftDiv = new BaseComponent('div')
            .setStyle({ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 })
            .mount(this.element);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this.task.completed;
        checkbox.onchange = () => this.onToggle(this.task.id);

        this.textSpan = new BaseComponent('span')
            .setText(this.task.text)
            .setStyle({
                textDecoration: this.task.completed ? 'line-through' : 'none',
                color: this.task.completed ? '#888' : '#000',
                cursor: 'pointer',
            })
            .mount(leftDiv.element);

        this.textSpan.element.ondblclick = () => this.enableEdit();

        leftDiv.element.prepend(checkbox);

        const actionsDiv = new BaseComponent('div')
            .setStyle({ display: 'flex', gap: '5px' })
            .mount(this.element);

        this.editBtn = document.createElement('button');
        this.editBtn.textContent = '✏️';
        this.editBtn.title = 'Редактировать';
        this.editBtn.style.background = '#ffc107';
        this.editBtn.style.color = '#000';
        this.editBtn.onclick = e => {
            e.stopPropagation();
            this.enableEdit();
        };

        const delBtn = document.createElement('button');
        delBtn.textContent = '🗑';
        delBtn.className = 'delete';
        delBtn.onclick = () => this.onRemove(this.task.id);

        actionsDiv.element.append(this.editBtn, delBtn);
    }

    enableEdit() {
        const originalText = this.task.text;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = this.task.text;
        input.style.padding = '4px 8px';
        input.style.border = '1px solid #667eea';
        input.style.borderRadius = '4px';
        input.style.flex = '1';

        this.textSpan.element.replaceWith(input);
        input.focus();
        input.select();

        const save = () => {
            const newText = input.value.trim();
            if (newText && newText !== originalText) {
                this.onEdit(this.task.id, newText);
            }
            this.render();
        };

        input.onkeydown = e => {
            if (e.key === 'Enter') {
                save();
            }
            if (e.key === 'Escape') {
                this.render();
            }
        };
        input.onblur = save;
    }
}
