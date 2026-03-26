export class Router {
    constructor(routes) {
        this.routes = routes;
        this.app = null;
        this.currentComponent = null;
    }

    init(appElement) {
        this.app = appElement;
        window.addEventListener('hashchange', () => this.render());
        this.render();
    }

    render() {
        const path = window.location.hash.slice(1) || '/';
        const handler = this.routes[path] || this.routes['/'];

        this.app.innerHTML = '';

        if (this.currentComponent && this.currentComponent.unmount) {
            this.currentComponent.unmount();
        }

        if (handler) {
            this.currentComponent = handler();
            if (this.currentComponent.mount) {
                this.currentComponent.mount(this.app);
            }
        }
    }
}
