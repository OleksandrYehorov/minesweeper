import { FC } from 'react';
import styled from 'styled-components/macro';
import { invertedShadow } from '../styles/shadow';
import { MinesCounter } from './MinesCounter';
import { StartGameButton } from './StartGameButton';
import { Timer } from './Timer';

export const Header: FC = () => {
  return (
    <Container>
      <Left>
        <MinesCounter />
      </Left>
      <Center>
        <StartGameButton />
      </Center>
      <Right>
        <Timer />
      </Right>
    </Container>
  );
};

const Container = styled.header`
  ${invertedShadow}
  padding: 0.2rem;
  display: flex;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  overflow: hidden;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  overflow: hidden;
`;
