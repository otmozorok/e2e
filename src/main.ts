import { mount } from 'svelte';
import App from './app.svelte';
import './style.css';

export default mount(App, { target: document.querySelector('app') as Element });
