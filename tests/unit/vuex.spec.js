import Store from '@/store/index.js';

describe('Global State default values', () => {
  it('Theme property should start with "numbers" value by default', () => {
    const themeByDefault = Store.getters.theme;
    const expected = 'numbers';
    expect(themeByDefault).toBe(expected);
  }),
  it('PlayerNumber property should start with "one" value by default', () => {
    const playerNumberByDefault = Store.getters.playerNumber;
    const expected = 'one';
    expect(playerNumberByDefault).toBe(expected);
  }),
  it('GridSize property should start with "fourTimesFour" value by default', () => {
    const gridSizeByDefault = Store.getters.gridSize;
    const expected = 'fourTimesFour';
    expect(gridSizeByDefault).toBe(expected);
  }),
  it('EndGame property should start with false value by default', () => {
    const endGameByDefault = Store.getters.endGame;
    const expected = false;
    expect(endGameByDefault).toBe(expected);
  }),
  it('Restart property should start with false value by default', () => {
    const restartByDefault = Store.getters.restart;
    const expected = false;
    expect(restartByDefault).toBe(expected);
  })
});

describe('Solo State default values', () => {
  it('Moves property should start with 0 value by default', () => {
    const movesByDefault = Store.getters['solo/moves'];
    const expected = 0;
    expect(movesByDefault).toBe(expected);
  }),
  it('Matches property should start with an empty array value by default', () => {
    const matchesByDefault = Store.getters['solo/matches'];
    const expected = 0;
    expect(matchesByDefault).toHaveLength(expected);
  }),
  it('CurrenPick property should start with null value by default', () => {
    const currenPickByDefault = Store.getters['solo/currentPick'];
    const expected = null;
    expect(currenPickByDefault).toBe(expected);
  }),
  it('Attempts property should start with 0 value by default', () => {
    const attemptsByDefault = Store.getters['solo/attempts'];
    const expected = 0;
    expect(attemptsByDefault).toBe(expected);
  }),
  it('twoLastPicks property should start with an empty array value by default', () => {
    const twoLastPicksByDefault = Store.getters['solo/twoLastPicks'];
    const expected = 0;
    expect(twoLastPicksByDefault).toHaveLength(expected);
  }),
  it('timeElapsed property should start with "2:00" value by default', () => {
    const timeElapsedByDefault = Store.getters['solo/timeElapsed'];
    const expected = "2:00";
    expect(timeElapsedByDefault).toBe(expected);
  }),
  it('winning property should start with false value by default', () => {
    const winningByDefault = Store.getters['solo/winning'];
    const expected = false;
    expect(winningByDefault).toBe(expected);
  })
});

describe('Multi State default values', () => {
  it('Players property should start with an empty array value by default', () => {
    const playersByDefault = Store.getters['multi/players'];
    const expected = 0;
    expect(playersByDefault).toHaveLength(expected);
  }),
  it('TwoLastPicks property should start with an empty array value by default', () => {
    const twoLastPicksByDefault = Store.getters['multi/twoLastPicks'];
    const expected = 0;
    expect(twoLastPicksByDefault).toHaveLength(expected);
  }),
  it('CurrenPick property should start with null value by default', () => {
    const currenPickByDefault = Store.getters['multi/currentPick'];
    const expected = null;
    expect(currenPickByDefault).toBe(expected);
  }),
  it('CurrentTurn property should start with 1 value by default', () => {
    const currentTurnByDefault = Store.getters['multi/currentTurn'];
    const expected = 1;
    expect(currentTurnByDefault).toBe(expected);
  }),
  it('Attempts property should start with 0 value by default', () => {
    const attemptsByDefault = Store.getters['multi/attempts'];
    const expected = 0;
    expect(attemptsByDefault).toBe(expected);
  }),
  it('Matches property should start with an empty array value by default', () => {
    const matchesByDefault = Store.getters['multi/matches'];
    const expected = 0;
    expect(matchesByDefault).toHaveLength(expected);
  }),
  it('Winners property should start with an empty array value by default', () => {
    const winnersByDefault = Store.getters['multi/winners'];
    const expected = 0;
    expect(winnersByDefault).toHaveLength(expected);
  })
});
