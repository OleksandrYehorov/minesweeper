import { FC, StrictMode } from 'react';
import styled from 'styled-components/macro';
import { Game } from './components/Game';
import { GlobalStyle } from './styles/global';

const AppContainer = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const App: FC = () => (
  <StrictMode>
    <GlobalStyle />
    <AppContainer>
      <Game />
    </AppContainer>
  </StrictMode>
);
