import { createRoot } from 'react-dom/client';
import { disableZoom } from '../src/utils/disableZoom';
import { App } from './App';

disableZoom();

const container = document.getElementById('root');
if (container == null) {
  throw new Error('root element not found');
}
createRoot(container).render(<App />);
