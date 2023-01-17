import { FC, StrictMode } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { app } from './App.css';
import { Game } from './components/Game';
import './styles/global.css';

export const App: FC = () => {
  useRegisterSW();

  return (
    <StrictMode>
      <main className={app}>
        <Game />
      </main>
    </StrictMode>
  );
};
