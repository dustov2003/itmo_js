import { BaseComponent } from '../core/BaseComponent.js';

export default class Header extends BaseComponent {
    constructor() {
        super('header');
        this.render();
    }

    render() {
        this.element.innerHTML = '';
        this.setAttr('class', 'header');
        this.setStyle({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 20px',
            background: '#007bff',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '20px',
        });

        const nav = new BaseComponent('nav').mount(this.element);

        const homeLink = document.createElement('a');
        homeLink.href = '#/';
        homeLink.textContent = 'Главная';
        homeLink.style.color = 'white';
        homeLink.style.marginRight = '15px';
        homeLink.style.textDecoration = 'none';

        const aboutLink = document.createElement('a');
        aboutLink.href = '#/about';
        aboutLink.textContent = 'О проекте';
        aboutLink.style.color = 'white';
        aboutLink.style.textDecoration = 'none';

        nav.element.append(homeLink, aboutLink);
    }
}
