import { App } from '../../src/App';
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
    // eslint-disable-next-line cypress/no-assigning-return-values
    const cells = cy
      .get('[data-open=false]')
      .filter(
        (i, el) =>
          minesMockData.beginner.mines.findIndex(
            (mine) =>
              mine.x === Number(el.dataset.x) &&
              mine.y === Number(el.dataset.y),
          ) === -1,
      )
      .filter((i) => i < 5);

    cells.rightclick({ multiple: true });

    cy.findCellByCoords(minesMockData.beginner.mines[0]).click();

    cells.each(($el) => {
      cy.wrap($el)
        .findByRole('img', {
          name: 'crossed mine',
        })
        .should('exist');
    });
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
    cy.findCellByCoords({ x: 4, y: 4 }).as('cell').rightclick();

    cy.findCellByCoords(minesMockData.beginner.mines[0]).click();

    // try to unflag flagged cell
    cy.get('@cell').rightclick();
    cy.get('@cell')
      .findByRole('img', {
        name: 'crossed mine',
      })
      .should('exist');

    // try to flag cell
    cy.findCellByCoords({ x: 4, y: 5 }).as('cell').rightclick();
    cy.get('@cell')
      .findByRole('img', {
        name: 'flag',
      })
      .should('not.exist');

    // try to open cell
    cy.findCellByCoords({ x: 4, y: 6 }).as('cell').click();
    cy.get('@cell').should('have.attr', 'data-open', 'false');
  });
});
