const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Turn = require('../src/Turn');

describe('Turn', () => {
  let turn, card;
  beforeEach(() => {
    card = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    turn = new Turn('pug', card);
  });

  it('should be a function', () => {
    expect(Turn).to.be.a('function');
  });

  it('should be an instance of Turn', () => {
    expect(turn).to.be.an.instanceOf(Turn);
  });

  it('should store a user\'s guess', () => {
    expect(turn.guess).to.equal('pug');
  });

  it('should store a card', () => { 
    expect(turn.guess).to.equal('pug')
    expect(turn.card).to.deep.equal({
      id: 1,
      question: 'What is Robbie\'s favorite animal',
      answers: ['sea otter', 'pug', 'capybara'],
      correctAnswer: 'sea otter'
    });
  });

  it('should return user\'s guess', () => {
    expect(turn.returnGuess()).to.equal('pug');
  });

  it('should return card detail', () => {
    expect(turn.returnCard()).to.deep.equal({
      id: 1,
      question: 'What is Robbie\'s favorite animal',
      answers: ['sea otter', 'pug', 'capybara'],
      correctAnswer: 'sea otter'
    });
  });

  it('check if the user\'s guess is correct', () => {
    const turn2 = new Turn('sea otter', card);

    expect(turn.evaluateGuess()).to.deep.equal(false);
    expect(turn2.evaluateGuess()).to.deep.equal(true);
  });

  it('should give feedback for the user\'s guess', () => {
    const turn1 = new Turn('sea otter', card); 

    expect(turn1.giveFeedback()).to.deep.equal('Correct!');
    expect(turn.giveFeedback()).to.deep.equal('Incorrect!');
  });
    
});