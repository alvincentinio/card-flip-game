import React, { PureComponent } from "react";
import Header from "./components/header/Header";
import Card from "./components/card/Card";
import GameOver from "./components/card/GameOver";

import "./styles/main.css";

class App extends PureComponent {
  state = {
    isFlipped: Array(16).fill(false),
    shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
    clickCount: 1,
    prevSelectedCard: -1,
    prevCardId: -1,
    player1Score: 0,
    player2Score: 0,
    currentPlayer: 1,
    bgImage: "cat"
  };

  static duplicateCard = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7].reduce(
      (preValue, current, index, array) => {
        return preValue.concat([current, current]);
      },
      []
    );
  };

  handleClick = event => {
    event.preventDefault();
    const cardId = event.target.id;
    const newFlipps = this.state.isFlipped.slice();
    this.setState({
      prevSelectedCard: this.state.shuffledCard[cardId],
      prevCardId: cardId
    });

    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState(prevState => ({
        isFlipped: newFlipps,
        clickCount: this.state.clickCount + 1
      }));

      if (this.state.clickCount === 2) {
        this.setState({ clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const previousCard = this.state.prevSelectedCard;

        this.isCardMatch(previousCard, newCard, prevCardId, cardId);
      }
    }
  };

  isCardMatch = (card1, card2, card1Id, card2Id) => {
    if (card1 === card2) {
      if (this.state.currentPlayer === 1) {
        this.setState({ player1Score: this.state.player1Score + 1 });
      } else if (this.state.currentPlayer === 2) {
        this.setState({ player2Score: this.state.player2Score + 1 });
      }
      const hideCard = this.state.shuffledCard.slice();
      hideCard[card1Id] = -1;
      hideCard[card2Id] = -1;
      setTimeout(() => {
        this.setState(prevState => ({
          shuffledCard: hideCard
        }));
      }, 1000);
    } else {
      const flipBack = this.state.isFlipped.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      setTimeout(() => {
        if (this.state.currentPlayer === 1) {
          this.setState(prevState => ({
            isFlipped: flipBack,
            currentPlayer: 2
          }));
        } else if (this.state.currentPlayer === 2) {
          this.setState(prevState => ({
            isFlipped: flipBack,
            currentPlayer: 1
          }));
        }
      }, 1000);
    }
  };

  restartGame = () => {
    this.setState({
      isFlipped: Array(16).fill(false),
      shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1,
      currentPlayer: 1,
      player1Score: 0,
      player2Score: 0
    });
  };

  isGameOver = () => {
    return this.state.isFlipped.every(
      (element, index, array) => element !== false
    );
  };
  getWinner = () => {
    if (this.state.player1Score > this.state.player2Score) {
      return "P1ayer 1 Wins !!!";
    } else if (this.state.player2Score > this.state.player1Score) {
      return "Player 2 Wins !!!";
    } else {
      return "It's a Draw !!!";
    }
  };
  changeBgImage = event => {
    this.setState({ bgImage: event.target.value });
  };

  render() {
    return (
      <div>
        <Header
          restartGame={this.restartGame}
          player1Score={this.state.player1Score}
          player2Score={this.state.player2Score}
          currentPlayer={this.state.currentPlayer}
          changeBgImage={this.changeBgImage}
        />
        {this.isGameOver() ? (
          <GameOver restartGame={this.restartGame} winner={this.getWinner()} />
        ) : (
          <div className="grid-container">
            {this.state.shuffledCard.map((cardNumber, index) => (
              <Card
                key={index}
                id={index}
                cardNumber={cardNumber}
                isFlipped={this.state.isFlipped[index]}
                handleClick={this.handleClick}
                bgImage={this.state.bgImage}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;
