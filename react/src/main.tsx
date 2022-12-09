import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root');
if (container == null) {
  throw new Error('root element not found');
}
createRoot(container).render(<App />);
