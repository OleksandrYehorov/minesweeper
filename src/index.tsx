import { render } from 'react-dom';
import { App } from './App';
import { register as registerServiceWorker } from './serviceWorkerRegistration';
import './firebase';

render(<App />, document.getElementById('root'));

registerServiceWorker();
