import React from 'react';
import styled from 'styled-components/macro';
import { Game } from './components/Game';

const AppContainer = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const App: React.FC = () => (
  <AppContainer>
    <Game />
  </AppContainer>
);
