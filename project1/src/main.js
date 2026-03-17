import { createStore } from './store/createStore.js';
import { taskReducer } from './store/reducers.js';
import { Router } from './router/Router.js';
import { injectGlobalStyles, globalStyles } from './utils/styles.js';
import HomePage from './components/HomePage.js';
import AboutPage from './components/AboutPage.js';

injectGlobalStyles(globalStyles);

const saved = localStorage.getItem('appState');
const initial = saved ? JSON.parse(saved) : { tasks: [] };
const store = createStore(taskReducer, initial);

store.subscribe(() => {
    localStorage.setItem('appState', JSON.stringify(store.getState()));
});

const app = document.getElementById('app');
const router = new Router({
    '/': () => new HomePage(store),
    '/about': () => new AboutPage()
});

router.init(app);

console.log('App started');
console.log('State:', store.getState());