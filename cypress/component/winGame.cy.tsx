import { App } from '../../src/App';
import { minesMockData } from '../../src/utils/minesMockData';

describe('win game', () => {
  beforeEach(() => {
    cy.mount(<App />);
  });

  it('game is won by opening all non mine cells', () => {
    cy.findCellByCoords(minesMockData.beginner.firstClick).click();

    // flag all mines
    for (const coords of minesMockData.beginner.mines) {
      cy.findCellByCoords(coords).rightclick();
    }

    // click all unrevealed cells
    cy.get('[data-open=false]').each(($el) => {
      cy.wrap($el).click();
    });

    // check that the game is won
    cy.findByRole('img', {
      name: /smiling face with sunglasses/i,
    }).should('exist');

    // check that cells can not be unflagged after win
    const flaggedCellCoords = minesMockData.beginner.mines[0];
    cy.findCellByCoords(flaggedCellCoords).as('cell');
    cy.get('@cell').rightclick();
    cy.get('@cell')
      .findByRole('img', {
        name: 'flag',
      })
      .should('exist');
  });
});
