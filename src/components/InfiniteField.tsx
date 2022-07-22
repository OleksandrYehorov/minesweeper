import { FC, useState, useRef } from 'react';
import styled from 'styled-components/macro';

let left = -500;
let top = -500;

export const InfiniteField: FC = ({ children }) => {
  const [active, setActive] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);

  return (
    <_FieldView>
      <_Field
        ref={fieldRef}
        role="button"
        tabIndex={-1}
        onMouseDown={(e) => {
          setActive(true);
          e.stopPropagation();
          e.preventDefault();
        }}
        onMouseUp={(e) => {
          setActive(false);
          e.stopPropagation();
          e.preventDefault();
        }}
        onMouseMove={(e) => {
          if (active) {
            if (fieldRef.current) {
              left += e.movementX;
              top += e.movementY;

              fieldRef.current.style.top = top + 'px';
              fieldRef.current.style.left = left + 'px';
            }
          }
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {children}
      </_Field>
    </_FieldView>
  );
};

const _FieldView = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const _Field = styled.div`
  height: 1000px;
  width: 1000px;
  position: absolute;
  user-select: none;
  top: -500px;
  left: -500px;
`;
