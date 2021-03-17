import { render } from 'react-dom';
import { App } from './App';
import { register as registerServiceWorker } from './serviceWorkerRegistration';

render(<App />, document.getElementById('root'));

registerServiceWorker();
