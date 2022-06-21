import { FC } from 'react';
import styled from 'styled-components';
import { shadow } from '../styles/shadow';
import { Board } from './Board';
import { DifficultySelect } from './DifficultySelect';
import { Header } from './Header';

export const Game: FC = () => {
  return (
    <Container>
      <Header />
      <Board />
      <DifficultySelect />
    </Container>
  );
};

const Container = styled.div`
  ${shadow}
  box-sizing: border-box;
  padding: 0.4rem;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100%;
  max-height: 100%;
`;
