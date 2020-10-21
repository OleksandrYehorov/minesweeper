import React from 'react';
import styled from 'styled-components';
import { shadow } from '../styles/shadow';
import { Board } from './Board';
import { DifficultySelect } from './DifficultySelect';
import { Header } from './Header';

const Container = styled.div`
  ${shadow}
  padding: 0.4rem;
  user-select: none;
`;

export const Game: React.FC = () => {
  return (
    <Container>
      <Header />
      <Board />
      <DifficultySelect />
    </Container>
  );
};
