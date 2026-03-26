import { createStore } from './store/createStore.js';
import { taskReducer } from './store/reducers.js';
import { Router } from './router/Router.js';
import { injectGlobalStyles, globalStyles } from './utils/styles.js';
import { storage } from './utils/storage.js';
import HomePage from './components/HomePage.js';
import AboutPage from './components/AboutPage.js';

injectGlobalStyles(globalStyles);

const initial = storage.get('appState', { tasks: [] });
const store = createStore(taskReducer, initial);

store.subscribe(() => {
    storage.set('appState', store.getState());
});

const app = document.getElementById('app');

const router = new Router({
    '/': () => new HomePage(store),
    '/about': () => new AboutPage(),
});

router.init(app);

console.log('App started');
console.log('State:', store.getState());