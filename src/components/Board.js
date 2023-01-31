import React from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { x } from "react-icons-kit/oct/x";
// import {info} from 'react-icons-kit/oct/info'
// import {heart} from 'react-icons-kit/oct/heart'

const Board = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
`;

const Circle = ({ size }) => (
  <svg width={size} height={size}>
    <circle
      stroke="black"
      fill="none"
      strokeWidth={6}
      cx={size / 2}
      cy={size / 2}
      r={(size - 6) / 2}
    />
  </svg>
);

const Row = styled.tr`
  border-bottom: 4px solid gray;
  :last-child {
    border-bottom: none;
  }
`;

const Cell = styled.td`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  text-align: center;
  :nth-child(n + 2) {
    border-left: 4px solid gray;
  }
`;
// 0 1 2
// 1
// 2

const defaultTable = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

export default ({ table = defaultTable, cellClick, cellSize = 100 }) => (
  <Board>
    <tbody>
      {table.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((item, colIndex) => (
            <Cell
              size={cellSize}
              key={colIndex}
              onClick={() => cellClick(rowIndex, colIndex)}
            >
              {item === null ? (
                ""
              ) : item === "x" ? (
                <Icon size={cellSize} icon={x} />
              ) : (
                <Circle size={cellSize * 0.8} />
              )}
            </Cell>
          ))}
        </Row>
      ))}
    </tbody>
  </Board>
);
