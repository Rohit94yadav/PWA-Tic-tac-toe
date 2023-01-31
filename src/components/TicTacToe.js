// Once finished add feedback to tweet
// https://twitter.com/javascriptflx/status/1151984106626043907
import React from "react";
import Modal from "react-modal";

import styled from "styled-components";
import Board from "./Board";
import useGameLogic from "./useGameLogic";

export default () => {
  const [table, { gameStatus, actions }] = useGameLogic();

  return (
    <>
      {/* Render turn info */}
      {!gameStatus.gameover && (
        <span>{gameStatus.currentPlayerText(gameStatus.activePlayer)}</span>
      )}

      {/* Render game board */}
      <Board table={table} cellClick={actions.handleCellClick} />

      {/* Render gamem mode select or restart button */}
      {gameStatus.round === 0 && (
        <select
          value={gameStatus.gameMode}
          onChange={(e) => actions.setGameMode(e.target.value)}
        >
          <option value="ki">Play against PC</option>
          <option value="human">Play against human</option>
        </select>
      )}
      {gameStatus.gameover && (
        <Restart onClick={actions.handleRestart}>Restart game?</Restart>
      )}

      {/* Render gamemover modal */}
      <Modal
        appElement={document.getElementById("root")}
        isOpen={gameStatus.showGameover}
        onRequestClose={actions.hideGameoverModal}
      >
        <h1>Game over</h1>
        <h2>
          {gameStatus.winner ? `Player ${gameStatus.winner} won!` : "Draw!"}
        </h2>
        <button onClick={actions.hideGameoverModal}>close</button>
        <Restart
          onClick={() => {
            actions.hideGameoverModal();
            actions.handleRestart();
          }}
        >
          Restart game?
        </Restart>
      </Modal>
    </>
  );
};

const Restart = styled.button`
  outline: none;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
`;
