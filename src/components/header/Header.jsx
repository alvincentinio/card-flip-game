import React from "react";

const Header = ({
  restartGame,
  player1Score,
  player2Score,
  currentPlayer,
  changeBgImage
}) => (
  <div className="grid-header-container">
    <div className="justify-left timer">
      Player 1: {player1Score}
      <br />
      Player 2: {player2Score}
    </div>
    <div className="justify-center game-status-text">
      <span>Player {currentPlayer}'s Go!</span>
      <br />
      <form className="form" onChange={changeBgImage}>
        <span>Swap Background Image </span>
        <span>
          <select name="bg">
            <option value="cat">Cat</option>
            <option value="puppy">Puppy</option>
            <option value="spaceman">Spaceman</option>
            {/* <option value="orlaith">Orlaith</option> */}
          </select>
        </span>
      </form>
    </div>
    <div className="justify-end">
      <button onClick={restartGame} className="restart-button">
        Restart Game
      </button>
    </div>
  </div>
);

export default Header;
