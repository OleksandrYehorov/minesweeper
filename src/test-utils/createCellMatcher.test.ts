import { createCellMatcher } from './createCellMatcher';

describe('createCellMatcher', () => {
  test('matches cell by flagged', () => {
    expect(
      createCellMatcher({ isFlagged: true })('closed flagged cell x6 y5'),
    ).toBe(true);

    expect(
      createCellMatcher({ isFlagged: false })('closed flagged cell x6 y5'),
    ).toBe(false);
  });

  test('matches cell by mine', () => {
    expect(createCellMatcher({ isMine: true })('open mine cell x6 y5')).toBe(
      true,
    );

    expect(createCellMatcher({ isMine: false })('open mine cell x6 y5')).toBe(
      false,
    );
  });

  test('matches cell by open/closed', () => {
    expect(createCellMatcher({ isOpen: true })('open number cell x6 y5')).toBe(
      true,
    );

    expect(createCellMatcher({ isOpen: false })('open number cell x6 y5')).toBe(
      false,
    );
  });

  test('matches cell by coordinates', () => {
    expect(createCellMatcher({ x: 6, y: 5 })('open number cell x6 y5')).toBe(
      true,
    );

    expect(createCellMatcher({ x: 6, y: 7 })('open number cell x6 y5')).toBe(
      false,
    );
  });

  test('matches cell by multiple parameters', () => {
    expect(
      createCellMatcher({
        isOpen: true,
        isFlagged: true,
        isMine: false,
        x: 6,
        y: 5,
      })('open flagged cell x6 y5'),
    ).toBe(true);

    expect(
      createCellMatcher({
        isOpen: false,
        isFlagged: true,
        isMine: false,
        x: 3,
        y: 2,
      })('open flagged cell x6 y5'),
    ).toBe(false);
  });
});
