import { render } from 'react-dom';
import { App } from './App';
import { register as registerServiceWorker } from './serviceWorkerRegistration';
import { initFirebase } from './services/firebase';

render(<App />, document.getElementById('root'));

initFirebase();
registerServiceWorker();
