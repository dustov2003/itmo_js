import { BaseComponent } from '../core/BaseComponent.js';
import { debounce } from '../utils/helpers.js';

export default class TaskForm extends BaseComponent {
    constructor(onSubmit) {
        super('form');
        this.onSubmit = onSubmit;
        this.render();
    }

    render() {
        this.element.innerHTML = '';
        this.setAttr('class', 'task-form');
        this.setStyle({ 
            display: 'flex', 
            marginBottom: '20px',
            gap: '10px'
        });

        this.element.onsubmit = (e) => e.preventDefault();

        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Новая задача';
        this.input.style.flex = '1';
        this.input.style.padding = '8px';

        this.debouncedValidate = debounce((value) => {
            console.log('Validating:', value);
        }, 300);

        this.input.oninput = (e) => this.debouncedValidate(e.target.value);

        this.btn = document.createElement('button');
        this.btn.type = 'submit';
        this.btn.textContent = 'Добавить';
        this.btn.onclick = (e) => {
            e.preventDefault();
            if (this.input.value.trim()) {
                this.onSubmit(this.input.value.trim());
                this.input.value = '';
            }
        };

        this.element.append(this.input, this.btn);
    }
}