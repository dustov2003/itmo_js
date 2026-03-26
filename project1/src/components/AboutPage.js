import { BaseComponent } from '../core/BaseComponent.js';
import Header from './Header.js';
import readmeContent from '../../README.md?raw';

export default class AboutPage {
    constructor() {
        this.container = new BaseComponent('div');
    }

    mount(parent) {
        parent.appendChild(this.container.element);
        this.render();
    }

    render() {
        this.container.element.innerHTML = '';

        new Header().mount(this.container.element);

        const content = new BaseComponent('div')
            .setAttr('class', 'about-content')
            .setStyle({
                background: 'white',
                padding: '30px',
                borderRadius: '8px',
                maxWidth: '800px',
                margin: '20px auto',
                lineHeight: '1.8',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            })
            .mount(this.container.element);

        new BaseComponent('h1')
            .setText('📄 Документация проекта')
            .setStyle({
                textAlign: 'center',
                color: '#333',
                marginBottom: '30px',
                borderBottom: '2px solid #667eea',
                paddingBottom: '10px',
            })
            .mount(content.element);

        const htmlContent = this.parseMarkdown(readmeContent);

        const readmeDiv = new BaseComponent('div')
            .setAttr('class', 'readme-content')
            .mount(content.element);

        readmeDiv.element.innerHTML = htmlContent;

        this.injectReadmeStyles();

        const backBtn = document.createElement('a');
        backBtn.href = '#/';
        backBtn.textContent = '← Вернуться к задачам';
        backBtn.style.display = 'block';
        backBtn.style.textAlign = 'center';
        backBtn.style.marginTop = '30px';
        backBtn.style.padding = '12px 24px';
        backBtn.style.background = '#667eea';
        backBtn.style.color = 'white';
        backBtn.style.textDecoration = 'none';
        backBtn.style.borderRadius = '6px';
        backBtn.style.fontWeight = 'bold';
        backBtn.onmouseover = () => (backBtn.style.background = '#764ba2');
        backBtn.onmouseout = () => (backBtn.style.background = '#667eea');
        content.element.appendChild(backBtn);
    }

    parseMarkdown(md) {
        return md
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
            .replace(/\*(.*)\*/gim, '<i>$1</i>')
            .replace(/^- (.*$)/gim, '<li>$1</li>')
            .replace(/^\* (.*$)/gim, '<li>$1</li>')
            .replace(
                /`(.*)`/gim,
                '<code style="background:#f4f4f4;padding:2px 6px;border-radius:3px;">$1</code>'
            )
            .replace(
                /\[(.*)\]\((.*)\)/gim,
                '<a href="$2" target="_blank" style="color:#667eea;">$1</a>'
            )
            .replace(/\n\n/gim, '</p><p>')
            .replace(/^/, '<p>')
            .replace(/$/, '</p>');
    }

    injectReadmeStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .readme-content h1 { color: #2d3748; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
            .readme-content h2 { color: #4a5568; margin-top: 25px; }
            .readme-content h3 { color: #718096; margin-top: 20px; }
            .readme-content ul { padding-left: 20px; }
            .readme-content li { margin: 8px 0; color: #4a5568; }
            .readme-content p { margin: 15px 0; color: #4a5568; }
            .readme-content code { font-family: 'Consolas', monospace; font-size: 14px; }
            .readme-content a { text-decoration: none; }
            .readme-content a:hover { text-decoration: underline; }
        `;
        document.head.appendChild(style);
    }

    unmount() {
        this.container.unmount();
    }
}
