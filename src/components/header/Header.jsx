import React from "react";

const Header = ({ restartGame, player1Score, player2Score, currentPlayer }) => (
  <div className="grid-header-container">
    <div className="justify-left timer">
      Player 1: {player1Score}
      <br />
      Player 2: {player2Score}
    </div>
    <div className="justify-center game-status-text">
      Player {currentPlayer}'s Go!
    </div>
    <div className="justify-end">
      <button onClick={restartGame} className="restart-button">
        Restart Game
      </button>
    </div>
  </div>
);

export default Header;
