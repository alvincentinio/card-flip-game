import React from "react";

const GameOver = ({ restartGame, winner }) => (
  <div className="justify-center">
    <h1 className="animated bounceInLeft">Game Over!</h1>
    <h3>{winner}</h3>
    <button className="restart-button" onClick={restartGame}>
      Play Again
    </button>
  </div>
);

export default GameOver;
