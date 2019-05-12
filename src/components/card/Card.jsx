import React from "react";
import ReactCardFlip from "react-card-flip";

const Card = ({ id, isFlipped, handleClick, cardNumber, bgImage }) => (
  <ReactCardFlip
    isFlipped={isFlipped}
    flipSpeedBackToFront={1}
    flipSpeedFrontToBack={1}
  >
    <button
      id={id}
      className={`card card-front ${bgImage} ${
        cardNumber !== -1 ? "" : "hide-card"
      }`}
      onClick={handleClick}
      key="front"
    />

    <button
      id={id}
      className={`card card-back ${cardNumber !== -1 ? "" : "hide-card"}`}
      onClick={handleClick}
      key="back"
    >
      {cardNumber}
    </button>
  </ReactCardFlip>
);

export default Card;
