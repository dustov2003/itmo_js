export class BaseComponent {
    constructor(tagName = 'div') {
        this.element = document.createElement(tagName);
    }
    setAttr(key, value) {
        this.element.setAttribute(key, value);
        return this;
    }
    setStyle(styles) {
        Object.assign(this.element.style, styles);
        return this;
    }
    setText(text) {
        this.element.textContent = text;
        return this;
    }
    mount(parent) {
        parent.appendChild(this.element);
        return this;
    }
    unmount() {
        this.element.remove();
        return this;
    }
}
