import { FC, StrictMode } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components/macro';
import { Game } from './components/Game';
import { store } from './redux/store';
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
    <Provider store={store}>
      <GlobalStyle />
      <AppContainer>
        <Game />
      </AppContainer>
    </Provider>
  </StrictMode>
);
