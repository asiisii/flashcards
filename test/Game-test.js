const chai = require('chai');
const expect = chai.expect;

const Game = require('../src/Game');
const Round = require('../src/Round');

describe('Game', () => {
  let game;
  beforeEach(() => {
    game = new Game();
  });

  it('should be a function', () => { 
    expect(Game).to.be.a('function');
  });

  it('should be an instance of Game', () => {
    expect(game).to.be.an.instanceOf(Game);
  });

  it('current round should be declared', () => {
    expect(game.currentRound).to.equal(undefined);
  });

  it('should be an instance of round after the game starts', () => {
    game.start();
    expect(game.currentRound).to.be.an.instanceOf(Round);
  });

});