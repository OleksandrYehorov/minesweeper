import { FC, StrictMode } from 'react';
import styled from 'styled-components';
import { Game } from './components/Game';
import { GlobalStyle } from './styles/global';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const App: FC = () => {
  useRegisterSW();

  return (
    <StrictMode>
      <GlobalStyle />
      <AppContainer>
        <Game />
      </AppContainer>
    </StrictMode>
  );
};

const AppContainer = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
