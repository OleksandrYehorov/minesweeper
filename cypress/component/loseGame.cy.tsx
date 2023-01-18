import { App } from '../../src/App';
import { Coords } from '../../src/utils/constants';
import { minesMockData } from '../../src/utils/minesMockData';

describe('lose game', () => {
  beforeEach(() => {
    cy.mount(<App />);
    cy.findCellByCoords(minesMockData.beginner.firstClick).click();
  });

  it('game is lost by opening a mine cell', () => {
    cy.findCellByCoords(minesMockData.beginner.mines[0]).click();

    cy.findByRole('img', {
      name: /dizzy face/i,
    }).should('exist');
  });

  it('upon lose flagged cells without mines are marked as crossed mines', () => {
    const flaggedCellsWithoutMines: Coords[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 7, y: 1 },
    ];
    for (const coords of flaggedCellsWithoutMines) {
      cy.findCellByCoords(coords).rightclick();
    }
    cy.findCellByCoords(minesMockData.beginner.mines[0]).click();

    for (const coords of flaggedCellsWithoutMines) {
      cy.findCellByCoords(coords).within(() => {
        cy.findByRole('img', {
          name: 'crossed mine',
        }).should('exist');
      });
    }
  });

  it('upon lose all not flagged mines are revealed', () => {
    cy.findCellByCoords(minesMockData.beginner.mines[0]).rightclick();
    cy.findCellByCoords(minesMockData.beginner.mines[1]).rightclick();
    cy.findCellByCoords(minesMockData.beginner.mines[2]).rightclick();
    cy.findCellByCoords(minesMockData.beginner.mines[3]).click();

    cy.findAllByRole('img', { name: 'flag' }).then((flaggedCellsElements) => {
      cy.findAllByRole('img', { name: 'mine' }).then((mineCellsElements) => {
        const flaggedCells = flaggedCellsElements.length;
        const mineCells = mineCellsElements.length;

        expect(flaggedCells).to.equal(3);
        expect(mineCells).to.equal(7);
      });
    });
  });

  it('upon lose cells can not be clicked, flagged and unflagged', () => {
    cy.findCellByCoords({ x: 0, y: 0 }).rightclick();

    cy.findCellByCoords(minesMockData.beginner.mines[0]).click();

    // try to unflag flagged cell
    cy.findCellByCoords({ x: 0, y: 0 }).rightclick();
    cy.findCellByCoords({ x: 0, y: 0 }).within(() => {
      cy.findByRole('img', {
        name: 'crossed mine',
      }).should('exist');
    });

    // try to flag cell
    cy.findCellByCoords({ x: 1, y: 0 }).rightclick();
    cy.findCellByCoords({ x: 1, y: 0 }).within(() => {
      cy.findByRole('img', {
        name: 'flag',
      }).should('not.exist');
    });

    // try to open cell
    cy.findCellByCoords({ x: 2, y: 0 }).click();
    cy.findCellByCoords({ x: 2, y: 0 }).should(
      'not.have.attr',
      'data-open',
      'false',
    );
  });
});
