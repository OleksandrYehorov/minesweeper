import { FC, StrictMode } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Game } from './components/Game';
import './styles/global.css';

export const App: FC = () => {
  useRegisterSW();

  return (
    <StrictMode>
      <Game />
    </StrictMode>
  );
};
