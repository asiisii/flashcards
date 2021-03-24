const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck;
    this.currentCard = deck.cards[0];
    this.turns = 0;
    this.inCorrectGuesses = [];
  }

  returnCurrentCard() {
    return this.currentCard;
  }
  
  takeTurn(guess) {
    const card = this.currentCard;
    const turn = new Turn(guess, card);
    this.turns++;
    if (!turn.evaluateGuess()) {
      this.inCorrectGuesses.push(card.id);
    }
    
    this.currentCard = this.deck.cards[this.turns];
    this.returnCurrentCard();
    return turn.giveFeedback();
  }

  calculatePercentCorrect() {
    const result = ((this.turns - this.inCorrectGuesses.length) / 
    this.turns) * 100;
    const resultInPercent = parseInt(result);
    return resultInPercent;
  }

  endRound() {
    const score = this.calculatePercentCorrect();
    const result = `** Round over! ** You answered ${score}% of the questions correctly!`;
    console.log(result) 
    return result;
  }

}

module.exports = Round;