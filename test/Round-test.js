const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

describe('Round', () => {
  let card1, card2, card3, deck, round;

  beforeEach(() => {
    card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
    deck = new Deck([card1, card2, card3]);
    round = new Round(deck);  
  });

  it('should be a function', () => { 
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', () => { 
    expect(round).to.be.instanceOf(Round);
  });

  it('should store cards', () => {
    expect(round.deck).to.deep.equal(deck);
  });

  it('current card should be the first card in the deck', () => {
    expect(round.currentCard).to.deep.equal(card1);
    expect(round.returnCurrentCard()).to.deep.equal(round.currentCard);
  });
  
  it('should start at 0 turn', () => {
    expect(round.turns).to.equal(0)
  });

  it('should be able to store incorrect guesses', () => { 
    expect(round.inCorrectGuesses.length).to.deep.equal(0);
  });
  
  it('should take player\'s guess and give feedback', () => {
    expect(round.takeTurn('sea otter')).to.equal('Correct!');
    expect(round.inCorrectGuesses.length).to.deep.equal(0);
  });
  
  it('should take player\'s guess and give feedback', () => {
    expect(round.takeTurn('spleen')).to.equal('Incorrect!');
    expect(round.inCorrectGuesses.length).to.deep.equal(1);
    expect(round.inCorrectGuesses[0]).to.deep.equal(1);
  });
  
  it('should update the current card after every turn', () => {
    expect(round.returnCurrentCard()).to.deep.equal(card1);
    round.takeTurn('gallbladder');
    expect(round.returnCurrentCard()).to.deep.equal(card2);
    
  });
  
  it('should increase turn by 1 after each guess', () => {
    expect(round.turns).to.equal(0);
    round.takeTurn('guess1');
    expect(round.turns).to.equal(1);
    round.takeTurn('guess2');
    expect(round.turns).to.equal(2);
  });

  it('should calculate the correct answers in percentage', () => {
    round.takeTurn('pug');
    round.takeTurn('gallbladder');
    round.takeTurn('playing with bubble wrap');

    expect(round.calculatePercentCorrect()).to.equal(66);
  });

  it('should be able to let player know when the game ends', () => {
    round.takeTurn('pug');
    round.takeTurn('gallbladder');
    round.takeTurn('playing with bubble wrap');
    round.calculatePercentCorrect();
    expect(round.endRound()).to.equal(`** Round over! ** You answered ${round.calculatePercentCorrect()}% of the questions correctly!`);
  });
  
});

