import React, { useState } from 'react';
import styled from 'styled-components';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 10px;
  margin-bottom: 20px;
`;

const Cell = styled.div`
  width: 100px;
  height: 100px;
  background: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(255, 255, 255, 0.08);
  transition: background 0.2s ease;
  color: #fff;
  user-select: none;

  &:hover {
    background: #444;
  }
`;

const Status = styled.div`
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #fff;
`;

const ResetButton = styled.button`
  padding: 12px 20px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: #4caf50;
  color: white;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #45a049;
  }
`;

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (i) => {
    if (winner || board[i]) {
      return;
    }
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderCell = (i) => {
    return (
      <Cell onClick={() => handleClick(i)}>
        {board[i]}
      </Cell>
    );
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every(cell => cell)) {
    status = 'Draw';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <BoardContainer>
      <Board>
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </Board>
      <Status>{status}</Status>
      <ResetButton onClick={resetBoard}>Reset</ResetButton>
    </BoardContainer>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default App;
